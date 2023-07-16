const axios = require('axios');
const get_insta_feed = async(req,res) => {
    try {
        const accessToken = 'IGQVJWNm1Va0ZAmU2twWlNDZA0NyMjNHLVFEUm8ySEdMckZAoYUNjY1luVHRFNEY2dEFON0l0bTNZAU04zdmlYME9FZAUk1enJiWHZAPT0x2Qy1zemJPaERLWEVrd1pEYllsaUluaVZAXd1hmeTlzbTgwOUJpOAZDZD';
        const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;
        const response = await axios.get(apiUrl);
        console.log(response.data)
        const feedData = response.data;
        res.status(200).send({ success: true, msg: 'Data sent successfully', data: feedData });
      } catch (error) {
        console.error('Error fetching Instagram feed:', error);
        res.status(500).json({ error: 'Failed to fetch Instagram feed' });
        res.status(500).json({ success: false,msg: 'Failed to fetch Instagram feed',data:feedData });
      }
}

module.exports = {get_insta_feed};