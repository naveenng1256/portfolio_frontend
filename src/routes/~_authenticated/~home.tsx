import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { BlogSection } from "./components/blog-section";
import { ProjectSection } from "./components/project-section";
import { useUserStore } from "./store";
import useUser from "@/hooks/useUser";
import { getLoggedInUserID } from "@/lib/user-auth";

export const Route = createFileRoute("/_authenticated/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const userId = getLoggedInUserID();
  const { userData } = useUserStore();
  const { useGetUserDetails } = useUser();

  useGetUserDetails(userId);
  const topRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <button
              className="flex items-center space-x-2"
              onClick={() => scrollToSection(topRef)}
            >
              <span className="inline-block font-bold">{userData.name}</span>
            </button>
            <nav className="hidden gap-6 md:flex">
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection(blogRef)}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                blog
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </button>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={userData?.github ?? ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiGithub className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={userData?.linkedin ?? ""}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                onClick={() => {
                  navigate({
                    to: "/profile",
                  });
                }}
              >
                <CgProfile className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section
          ref={topRef}
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hi, I'm {userData?.name ?? "Anonymous"}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {userData?.profile_headline ??
                      "Aspiring professional seeking new opportunities."}
                  </p>
                </div>
              </div>
              <img
                src={
                  userData?.ing_url?.trim()
                    ? userData.ing_url
                    : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                }
                width="550"
                height="550"
                alt="Profile Image"
                className="mx-auto aspect-square rounded-xl object-cover sm:w-full lg:order-last border shadow-md"
              />
            </div>
          </div>
        </section>

        <section
          id="about"
          ref={aboutRef}
          className="w-full bg-muted/40 py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Me
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                {userData?.profile_summary ?? ""}
              </p>
            </div>

            <div className="mx-auto flex flex-wrap justify-center gap-6 py-12">
              {userData?.skills &&
                userData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="w-full max-w-sm flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-bold">{skill.skill_heading}</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      {skill.key_skills.join(" , ")}
                    </p>
                  </div>
                ))}
            </div>

            {!userData?.skills || userData.skills.length === 0 ? (
              <div className="text-slate-400 text-center">
                + add your skills through profile section
              </div>
            ) : null}
          </div>
        </section>

        <section
          id="projects"
          ref={projectsRef}
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <ProjectSection projects={userData?.projects ?? []} />
        </section>

        <section
          id="blog"
          ref={blogRef}
          className="w-full bg-muted/40 py-12 md:py-24 lg:py-32"
        >
          <BlogSection blogs={userData?.blogs ?? []} />
        </section>

        <section
          id="contact"
          ref={contactRef}
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Get in Touch
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or just want to say hello? I'd love to
                hear from you.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your message"
                  />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Github className="h-4 w-4" />
                  <Link href="https://github.com" className="underline">
                    github.com/janedoe
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
