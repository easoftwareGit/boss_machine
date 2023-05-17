const checkMillionDollarIdea = (req, res, next) => {
  const idea = req.body;
  if (!idea) {
    res.status(400).send('Invalid Idea');
  }
  let mdWeeks = idea.numWeeks;
  if (!mdWeeks) {
    res.status(400).send('Invalid numWeeks');
  }
  mdWeeks = Number(mdWeeks);
  if (isNaN(mdWeeks)) {
    res.status(400).send('Invalid numWeeks');
  }
  let mdWeeklyRevenue = idea.weeklyRevenue;
  if (!mdWeeklyRevenue) {
    res.status(400).send('Invalid weeklyRevenue');
  }
  mdWeeklyRevenue = Number(mdWeeklyRevenue);
  if (isNaN(mdWeeklyRevenue)) {
    res.status(400).send('Invalid weeklyRevenue');
  }
  const ideaValue = mdWeeks * mdWeeklyRevenue;
  if (isNaN(ideaValue) || ideaValue < 1000000) {    
    res.status(400).send('Not a million $ idea');
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
