import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.port || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Posts array In-memory array to store blog posts
// Define the posts array with the sample posts
let posts = [
    {
        title: "The Future of AI: Beyond 2024",
        content: "Artificial Intelligence is evolving faster than ever. From autonomous vehicles to advanced natural language processing, the next few years promise an even more integrated role for AI in everyday life. But where is it all heading? Experts predict that AI will revolutionize industries such as healthcare, finance, and education. Personalized medicine, predictive algorithms for stock markets, and AI-powered learning platforms will be game-changers. However, ethical concerns around privacy and job displacement remain a hot topic. As AI continues to shape the future, how prepared are we for the changes to come?"
    },
    {
        title: "Quantum Computing: The Next Big Leap?",
        content: "Quantum computing is no longer just a futuristic concept—it’s becoming a reality. With companies like Google and IBM making significant breakthroughs, quantum computers could soon outpace traditional machines in solving complex problems. What does this mean for industries like cybersecurity, pharmaceuticals, and even artificial intelligence? The potential is enormous, but so are the challenges. Developing stable qubits and reducing error rates are critical hurdles. Despite these obstacles, quantum computing promises to open doors we never thought possible, marking a new era in computational power."
    }
];


app.get('/', (req, res) => {
    res.render('home.ejs', { posts: posts });
});

app.post('/new-post', (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post); // Add new post to array
    res.redirect('/'); // Redirect to home after submission
});

app.get('/edit-post/:title', (req, res) => {
    const post = posts.find(p => p.title === req.params.title);
    res.render('edit.ejs', { post: post });
});

app.post('/edit-post/:title', (req, res) => {
    const post = posts.find(p => p.title === req.params.title);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

app.post('/delete-post/:title', (req, res) => {
    const postIndex = posts.findIndex(p => p.title === req.params.title);
    if (postIndex > -1) {
        posts.splice(postIndex, 1); // Remove post from array
    }
    res.redirect('/');
});


// Starting server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
