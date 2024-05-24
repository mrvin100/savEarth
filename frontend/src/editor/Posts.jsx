import Post from "./../components/Post";

export default function Posts() {
  const posts = [
    {
      src: "./src/img/post1.png",
      date: "sunday, 1 jan 2023",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      tags: ["Design", "Research", "presentation"],
    },
    {
      src: "./src/img/post2.png",
      date: "sunday, 1 jan 2023",
      title: "Migrating to Linear 101",
      description:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get...",
      tags: ["Design", "Research"],
    },
    {
      src: "./src/img/post3.png",
      date: "sunday, 1 jan 2023",
      title: "Building your API Stack",
      description:
        "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and manag...",
      tags: ["Design", "Research"],
    },
    {
      src: "./src/img/post4.png",
      date: "sunday, 1 jan 2023",
      title: "Grid system for better Design User Interface",
      description:
        "A grid system is a design tool used to arrange content on a webpage.",
      tags: ["Design", "Interface"],
    },
    {
      src: "./src/img/post5.png",
      date: "Alec Whitten • 1 Jan 2023",
      title: "Bill Walsh leadership lessons",
      description:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
      tags: ["Leadership", "Management"],
    },
    {
      src: "./src/img/post6.png",
      date: "Demi WIlkinson • 1 Jan 2023",
      title: "PM mental models",
      description:
        "Mental models are simple expressions of complex processes or relationships.",
      tags: ["Product", "Research", "Frameworks"],
    },
    {
      src: "./src/img/post7.png",
      date: "Natali Craig • 1 Jan 2023",
      title: "How collaboration makes us better designers",
      description:
        "Collaboration can make our teams stronger, and our individual designs better.",
      tags: ["Design", "Research"],
    },
    {
      src: "./src/img/post8.png",
      date: "sunday, 1 jan 2023",
      title: "Grid system for better Design User Interface",
      description:
        "A grid system is a design tool used to arrange content on a webpage.",
      tags: ["Design", "Research"],
    },
    {
      src: "./src/img/post9.png",
      date: "Candice Wu • 1 Jan 2023",
      title: "What is Wireframing?",
      description:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
      tags: ["Design", "Research"],
    },
    {
      src: "./src/img/post10.png",
      date: "Drew Cano • 1 Jan 2023",
      title: "Our top 10 Javascript frameworks to use",
      description:
        "JavaScript frameworks make development easy with extensive features and functionalities.",
      tags: ["software development", "Tools", "Saas"],
    },
  ];
  return (
    <section className="blog posts container">
      <h1 className="heading">My Posts</h1>
      <div className="box_container">
        {[...posts].slice(posts.length - 3).map((post) => {
          return <Post key={posts.indexOf(post)} post={post} />;
        })}
      </div>
    </section>
  );
}
