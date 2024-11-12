const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = 3000;

// In-memory MongoDB fallback setup (if no external MongoDB is provided)
let mongoUri = 'mongodb://localhost:27017/studentsDB'; // Default MongoDB URI
let mongoServer = null;

// Check if MongoDB is available; if not, use in-memory DB
async function connectToDatabase() {
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("MongoDB not available, falling back to in-memory DB.");
        mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to in-memory MongoDB!");
    }
}

// Middleware setup
app.use(bodyParser.json());

// Define a student schema and model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// Route to add a student
app.post('/students', async (req, res) => {
    const { name, age, grade } = req.body;
    
    if (!name || !age || !grade) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const student = new Student({ name, age, grade });

    try {
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// Route to retrieve all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Route to retrieve a student by ID
app.get('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching student by ID' });
    }
});

// Start the server
connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err);
    });
