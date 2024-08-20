const axios = require("axios");

async function getUserBlogEntry(req, res) {
  const userName = req.query.name;

  if (!userName) {
    // Render the form to enter username if no username is provided
    return res.render("user-blogs");
  }

  try {
    const url = `https://codeforces.com/api/user.blogEntries?handle=${encodeURIComponent(
      userName
    )}`;
    const response = await axios.get(url);
    const data = response.data;

    // Check if the data contains blog entries
    if (data && data.result) {
      res.render("user-blog-display", { blogEntries: data.result });
    } else {
      // Handle the case where no blog entries are found
      res.render("user-blog-display", { blogEntries: [] });
    }
  } catch (e) {
    console.error(e); // Log the error for debugging
    // Optionally, render an error view or send an error response
    res.status(500).render("error", { message: "Error fetching data" });
  }
}

module.exports = getUserBlogEntry;
