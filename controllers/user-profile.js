const axios = require("axios");

async function getUserProfile(req, res) {
  const userName = req.query.name;

  if (!userName) {
    return res.render("user-profile");
  }

  try {
    const url = `https://codeforces.com/api/user.info?handles=${encodeURIComponent(
      userName
    )}`;
    const response = await axios.get(url);
    const userData = response.data.result[0]; // Accessing the first user in the result array

    // Extracting only the required fields
    const data = {
      handle: userData.handle,
      rank: userData.rank,
      rating: userData.rating,
      maxRating: userData.maxRating,
      country: userData.country || "N/A",
      city: userData.city || "N/A",
      organization: userData.organization || "N/A",
      contribution: userData.contribution,
      friendOfCount: userData.friendOfCount,
      avatar: userData.avatar,
    };

    res.render("user-profile-display", { data });
  } catch (e) {
    console.error(e); // Log the error for debugging
    // res.status(404).send("Error fetching data");
  }
}

module.exports = getUserProfile;
