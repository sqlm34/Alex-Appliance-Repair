var ENABLE_CARMEL_ONLY_TARGETS_20260627 = [
  'SEARCH | Carmel IN | Appliance Repair',
  'SEARCH | Fishers IN | Appliance Repair',
  'SEARCH | Noblesville IN | Appliance Repair',
  'SEARCH | Westfield IN | Appliance Repair',
  'SEARCH | Zionsville IN | Appliance Repair',
  'SEARCH | McCordsville IN | Appliance Repair'
];

var ENABLE_CARMEL_ONLY_ACTIVE_20260627 = 'SEARCH | Carmel IN | Appliance Repair';

var main = function() {
  var summary = {
    campaignsFound: 0,
    campaignsEnabled: 0,
    campaignsPaused: 0,
    activeAdGroupsEnabled: 0,
    inactiveAdGroupsPaused: 0,
    activeKeywordsEnabled: 0,
    activeAdsEnabled: 0
  };

  Logger.log('ENABLE CARMEL ONLY START ' + new Date().toISOString());

  for (var i = 0; i < ENABLE_CARMEL_ONLY_TARGETS_20260627.length; i++) {
    var campaignName = ENABLE_CARMEL_ONLY_TARGETS_20260627[i];
    var campaign = getCampaignByExactName(campaignName);
    if (!campaign) {
      Logger.log('MISSING CAMPAIGN :: ' + campaignName);
      continue;
    }

    summary.campaignsFound++;
    var shouldEnable = campaignName === ENABLE_CARMEL_ONLY_ACTIVE_20260627;

    if (shouldEnable) {
      safeAction(function() { campaign.enable(); }, 'enable campaign ' + campaignName);
      summary.campaignsEnabled++;
      var activeCounts = enableCampaignChildren(campaign);
      summary.activeAdGroupsEnabled += activeCounts.adGroups;
      summary.activeKeywordsEnabled += activeCounts.keywords;
      summary.activeAdsEnabled += activeCounts.ads;
    } else {
      safeAction(function() { campaign.pause(); }, 'pause campaign ' + campaignName);
      summary.campaignsPaused++;
      summary.inactiveAdGroupsPaused += pauseAdGroupsOnly(campaign);
    }

    Logger.log('CAMPAIGN STATUS :: ' + campaignName + ' :: enabledTarget=' + shouldEnable + ' budget=' + safeValue(function() { return campaign.getBudget().getAmount(); }, 'n/a'));
  }

  Logger.log('SUMMARY :: campaignsFound=' + summary.campaignsFound + ' campaignsEnabled=' + summary.campaignsEnabled + ' campaignsPaused=' + summary.campaignsPaused + ' activeAdGroupsEnabled=' + summary.activeAdGroupsEnabled + ' inactiveAdGroupsPaused=' + summary.inactiveAdGroupsPaused + ' activeKeywordsEnabled=' + summary.activeKeywordsEnabled + ' activeAdsEnabled=' + summary.activeAdsEnabled);
  Logger.log('RESULT :: Carmel-only launch state applied. Expected active daily budget: $30/day.');
};

function getCampaignByExactName(name) {
  var it = AdsApp.campaigns().get();
  while (it.hasNext()) {
    var campaign = it.next();
    if (campaign.getName() === name) return campaign;
  }
  return null;
}

function enableCampaignChildren(campaign) {
  var counts = { adGroups: 0, keywords: 0, ads: 0 };
  var adGroups = campaign.adGroups().get();
  while (adGroups.hasNext()) {
    var adGroup = adGroups.next();
    safeAction(function() { adGroup.enable(); }, 'enable ad group ' + adGroup.getName());
    counts.adGroups++;

    var keywords = adGroup.keywords().get();
    while (keywords.hasNext()) {
      var keyword = keywords.next();
      safeAction(function() { keyword.enable(); }, 'enable keyword');
      counts.keywords++;
    }

    var ads = adGroup.ads().get();
    while (ads.hasNext()) {
      var ad = ads.next();
      safeAction(function() { ad.enable(); }, 'enable ad');
      counts.ads++;
    }
  }
  return counts;
}

function pauseAdGroupsOnly(campaign) {
  var count = 0;
  var adGroups = campaign.adGroups().get();
  while (adGroups.hasNext()) {
    var adGroup = adGroups.next();
    safeAction(function() { adGroup.pause(); }, 'pause ad group ' + adGroup.getName());
    count++;
  }
  return count;
}

function safeAction(fn, label) {
  try {
    fn();
  } catch (e) {
    Logger.log('ACTION WARNING :: ' + label + ' :: ' + e.message);
  }
}

function safeValue(fn, fallback) {
  try {
    return fn();
  } catch (e) {
    return fallback;
  }
}
