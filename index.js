const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// Define the POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Gracefully handle cases where 'data' is missing or not an array
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: "your_full_name_ddmmyyyy", // Replace with your details
                message: "Invalid input: 'data' key with an array is required."
            });
        }

        // --- ✏️ UPDATE THESE VALUES ---
        const user_id = "shivam_singh_29082002"; // Format: {full_name_ddmmyyyy}
        const email = "shivam.singh2020@vitbhopal.ac.in";
        const roll_number = "20BCE10738";
        // ---------------------------

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        // Process each item in the input data array
        data.forEach(item => {
            const itemStr = String(item); 

            if (/^-?\d+$/.test(itemStr)) {
                const num = parseInt(itemStr, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(itemStr);
                } else {
                    odd_numbers.push(itemStr);
                }
            } else if (/^[a-zA-Z]+$/.test(itemStr)) {
                alphabets.push(itemStr.toUpperCase());
                alphabet_string += itemStr;
            } else {
                special_characters.push(itemStr);
            }
        });

        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            concat_string += (i % 2 === 0) ? reversed_alphabets[i].toUpperCase() : reversed_alphabets[i].toLowerCase();
        }

        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            user_id: "your_full_name_ddmmyyyy",
            message: "An internal server error occurred.",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});