import {Tweet} from "../Models/tweetSchecma.js"

 export const createTweet = async(req, res) =>{

    try{
  const {description, id} = req.body;
     if(!description || !id){
        return res.status(401).json({
            message:"Fields are required",
            success:false
        })
     }
     await Tweet.create({
        description ,
        userId: id
     });
     return res.status(201).json({
        message:"Tweet created successfully",
        success : true
     })
    }catch(err){
   console.log(err)
    }
  }

  export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        const tweet = await Tweet.findByIdAndDelete(id);

        if (!tweet) {
            return res.status(404).json({
                message: "Tweet not found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "Tweet deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error); // Log the error for debugging
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};


export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
          
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        }else{
           
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};


export const getAllTweets = async (req,res) => {
    // loggedInUser ka tweet + following user tweet
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId:id});
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingUserTweet),
        })
    } catch (error) {
        console.log(error);
    }
}
export const getFollowingTweets = async (req,res) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); 
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
}
 