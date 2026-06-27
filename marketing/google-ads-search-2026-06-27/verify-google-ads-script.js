var VERIFY_TARGET_CAMPAIGNS_20260627 = ["SEARCH | Carmel IN | Appliance Repair","SEARCH | Fishers IN | Appliance Repair","SEARCH | Noblesville IN | Appliance Repair","SEARCH | Westfield IN | Appliance Repair","SEARCH | Zionsville IN | Appliance Repair","SEARCH | McCordsville IN | Appliance Repair"];
var VERIFY_EXPECTED_20260627 = { campaigns: 6, adGroups: 54, keywords: 684, ads: 54 };
var main = function() {
  let totals = { campaignsFound: 0, pausedCampaigns: 0, enabledCampaigns: 0, adGroups: 0, pausedAdGroups: 0, keywords: 0, ads: 0, schedules: 0, proximities: 0, negatives: 0 };
  Logger.log('VERIFY START ' + new Date().toISOString());
  VERIFY_TARGET_CAMPAIGNS_20260627.forEach(function(name) {
    const campaign = getCampaignByName(name);
    if (!campaign) {
      Logger.log('MISSING CAMPAIGN :: ' + name);
      return;
    }
    totals.campaignsFound++;
    const paused = safeBool(function(){ return campaign.isPaused(); });
    const enabled = safeBool(function(){ return campaign.isEnabled(); });
    if (paused) totals.pausedCampaigns++;
    if (enabled) totals.enabledCampaigns++;
    const budget = safeValue(function(){ return campaign.getBudget().getAmount(); }, 'n/a');
    const ag = countAdGroups(campaign);
    const schedules = countIterator(campaign.targeting().adSchedules().get());
    const proximities = countIterator(campaign.targeting().targetedProximities().get());
    const negatives = countIterator(campaign.negativeKeywords().get());
    totals.adGroups += ag.total;
    totals.pausedAdGroups += ag.paused;
    totals.keywords += ag.keywords;
    totals.ads += ag.ads;
    totals.schedules += schedules;
    totals.proximities += proximities;
    totals.negatives += negatives;
    Logger.log('CAMPAIGN :: ' + name + ' :: paused=' + paused + ' enabled=' + enabled + ' budget=' + budget + ' adGroups=' + ag.total + ' pausedAdGroups=' + ag.paused + ' keywords=' + ag.keywords + ' ads=' + ag.ads + ' schedules=' + schedules + ' proximities=' + proximities + ' negatives=' + negatives);
  });
  Logger.log('TOTALS :: campaignsFound=' + totals.campaignsFound + '/' + VERIFY_EXPECTED_20260627.campaigns + ' pausedCampaigns=' + totals.pausedCampaigns + ' enabledCampaigns=' + totals.enabledCampaigns + ' adGroups=' + totals.adGroups + '/' + VERIFY_EXPECTED_20260627.adGroups + ' keywords=' + totals.keywords + '/' + VERIFY_EXPECTED_20260627.keywords + ' ads=' + totals.ads + '/' + VERIFY_EXPECTED_20260627.ads + ' schedules=' + totals.schedules + ' proximities=' + totals.proximities + ' negatives=' + totals.negatives);
  Logger.log('RESULT :: ' + resultText(totals));
  logConversionActions();
};
function getCampaignByName(name) {
  const it = AdsApp.campaigns().get();
  while (it.hasNext()) {
    const c = it.next();
    if (c.getName() === name) return c;
  }
  return null;
}
function countAdGroups(campaign) {
  const out = { total: 0, paused: 0, keywords: 0, ads: 0 };
  const it = campaign.adGroups().get();
  while (it.hasNext()) {
    const g = it.next();
    out.total++;
    if (safeBool(function(){ return g.isPaused(); })) out.paused++;
    out.keywords += countIterator(g.keywords().get());
    out.ads += countIterator(g.ads().get());
  }
  return out;
}
function countIterator(it) {
  let n = 0;
  while (it.hasNext()) { it.next(); n++; }
  return n;
}
function safeBool(fn) {
  try { return !!fn(); } catch (e) { return false; }
}
function safeValue(fn, fallback) {
  try { return fn(); } catch (e) { return fallback; }
}
function resultText(t) {
  const ok = t.campaignsFound === VERIFY_EXPECTED_20260627.campaigns && t.enabledCampaigns === 0 && t.adGroups === VERIFY_EXPECTED_20260627.adGroups && t.keywords === VERIFY_EXPECTED_20260627.keywords && t.ads === VERIFY_EXPECTED_20260627.ads;
  return ok ? 'PASS: structure is complete and campaigns are paused' : 'CHECK: mismatch found in structure or status';
}
function logConversionActions() {
  try {
    const rows = AdsApp.search('SELECT conversion_action.name, conversion_action.status, conversion_action.type, conversion_action.category, conversion_action.primary_for_goal FROM conversion_action');
    let count = 0;
    for (const row of rows) {
      count++;
      Logger.log('CONVERSION :: name=' + row.conversionAction.name + ' status=' + row.conversionAction.status + ' type=' + row.conversionAction.type + ' category=' + row.conversionAction.category + ' primary=' + row.conversionAction.primaryForGoal);
    }
    Logger.log('CONVERSIONS_TOTAL :: ' + count);
  } catch (e) {
    Logger.log('CONVERSION_CHECK_ERROR :: ' + e.message);
  }
}
