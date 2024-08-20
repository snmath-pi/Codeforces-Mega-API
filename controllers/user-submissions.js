const axios = require("axios");
async function getUserSubmissions(req, res) {
  const userName = req.query.name;
  const count = req.query.count;
  if (!userName || !count) {
    return res.status(404).send("Invalid Username / Count");
  }
  const url = `https://codeforces.com/api/user.status?handle=${userName}&from=1&count=${count}`;

  try {
    const response = await axios(url);
    const data = response.data;
    res.render("user-submission-display", {
      submissions: data.result,
      count: data.result.length,
    });
  } catch (e) {
    return res.send(`<h1>Error in fetching data...</h1>`);
  }
}

module.exports = getUserSubmissions;
