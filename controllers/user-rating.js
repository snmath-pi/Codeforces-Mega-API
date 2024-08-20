const axios = require("axios");

async function getUserRatingHistory(req, res) {
  const userName = req.query.name;

  if (!userName) {
    // Render the form to enter username if no username is provided
    return res.render("user-blogs");
  }

  try {
    const url = `https://codeforces.com/api/user.rating?handle=${encodeURIComponent(
      userName
    )}`;
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.result) {
      const ndata = data.result.slice(-10).reverse();

      res.render("user-rating-display", {
        ratingChanges: ndata,
        user: userName,
      });
    } else {
      res.render("user-rating-display", { ratingChanges: [] });
    }
  } catch (e) {
    console.error(e); // Log the error for debugging
    // Optionally, render an error view or send an error response
    res.status(500).render("error", { message: "Error fetching data" });
  }
}

module.exports = getUserRatingHistory;
