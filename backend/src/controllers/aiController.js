import AIInsights from '../models/AIInsights.model.js';
import axios from 'axios';

// @desc    Analyze a repository using AI
// @route   POST /api/ai/analyze-repo
// @access  Private
export const analyzeRepo = async (req, res) => {
    try {
        const { repoName, owner } = req.body;
        
        if (!repoName || !owner) {
            return res.status(400).json({ success: false, message: 'Please provide repoName and owner' });
        }

        const fullRepoName = `${owner}/${repoName}`;

        // Check cache
        const existingInsight = await AIInsights.findOne({ repoName: fullRepoName });
        if (existingInsight) {
            return res.json({ success: true, data: existingInsight });
        }

        // Generate Insights (Mocked if no API Key provided, or use Real API)
        let summaryText = `This is a sample AI-generated summary for the repository ${fullRepoName}. ` +
            `It appears to be a software project written in various technologies. ` +
            `Please configure your OPENAI_API_KEY or GEMINI_API_KEY to generate real insights.`;
        
        let complexityScore = Math.floor(Math.random() * 5) + 3; // Random score between 3 and 8

        // Attempt Real API Check (Gemini example)
        if (process.env.GEMINI_API_KEY) {
            try {
                // We fetch the repo readme to feed the AI
                const readmeRes = await axios.get(`https://api.github.com/repos/${fullRepoName}/readme`);
                const decodedReadme = Buffer.from(readmeRes.data.content, 'base64').toString('ascii');

                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
                const prompt = `Analyze this GitHub repository README and provide: 
                1. A short summary of what it does (max 50 words).
                2. A project complexity score from 1-10 as a single number on the next line.
                README content: \n${decodedReadme.substring(0, 2000)}`;

                const result = await axios.post(geminiUrl, {
                    contents: [{ parts: [{ text: prompt }] }]
                });

                const textOutput = result.data.candidates[0].content.parts[0].text;
                const lines = textOutput.split('\n');
                summaryText = lines[0];
                const maybeScore = parseInt(lines[1], 10);
                if (!isNaN(maybeScore) && maybeScore >= 1 && maybeScore <= 10) {
                    complexityScore = maybeScore;
                }
            } catch (aiError) {
                console.error("AI Generation Failed:", aiError.message);
                // Fall back to mock
            }
        }

        const newInsight = new AIInsights({
            repoName: fullRepoName,
            summary: summaryText,
            complexityScore
        });

        await newInsight.save();

        res.json({ success: true, data: newInsight });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error Generating Insights' });
    }
};
