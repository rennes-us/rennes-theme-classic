$(document).ready(setup_instafeed);

function setup_instafeed()
{
	feed = new Instafeed({
		// Papers, please!
		accessToken: '17657889.1677ed0.9200b5eb951948b0a08edcd2add4cb8f',
	        clientId: 'f8e5611e8e19403e99edb04ce6066afe',
	        userId: '17657889',
	        // and more reasonably, what to fetch and how
	        get: 'user',
               	sortBy: 'most-recent',
	        limit: '5',
	        resolution: 'low_resolution' });
	feed.run()
}
