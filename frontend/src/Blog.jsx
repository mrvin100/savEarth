import { useEffect, useState } from "react";

import Post from "./components/Post";

export default function Blog() {
  // const blogDatas = [];
  const initPosts = [
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
  const [posts, setPosts] = useState(initPosts);
  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((datas) => datas.json())
      .then((res) => {
        console.log(res);
        setPosts(posts.concat(...res));
      });
  }, []);
  return (
    <section className="blog container">
      <h1 className="heading">Recent blog posts</h1>
      <div className="box_container">
        {[...posts].slice(posts.length - 3).map((post) => {
          return <Post key={posts.indexOf(post)} post={post} />;
        })}
      </div>
      <h1 className="heading">All blog posts</h1>
      <div className="box_container">
        {posts.map((post) => {
          return <Post key={posts.indexOf(post)} post={post} />;
        })}
      </div>
      <div className="navigations">
        <span className="prev">
          <i className="bx bx-left-arrow-alt"></i> Preview
        </span>
        <div className="items">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>..</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
        <span className="next">
          Next <i className="bx bx-right-arrow-alt"></i>
        </span>
      </div>
    </section>
  );
}
