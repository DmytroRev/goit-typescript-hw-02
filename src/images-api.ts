import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com"

const API_KEY = "3YMGh-G1vOJMJEVOYw_0t6Ipvy6C6mHZuPuQHf2fNPo"

type Value = { 
  topic: string;
  currentPage: number;
}

interface ImageDate {
  id: string;
  small: string;
  regular: string;
  instagram_username: string;
  username: string;
  location: string;
  total_likes: number
}

interface ApiResponse {
  results: Array<{
    id: string;
    urls: {
      small: string;
      regular: string;
    }
    user: {
      instagram_username: string;
      username: string;
      location: string;
    }
    likes: number
  }>
}

export const getImages = async (topic: string, currentPage: number): Promise<ImageDate[]> => {
  try {
    const response = await axios.get<ApiResponse>("/search/photos", {
      headers: {
        authorization: `Client-ID ${API_KEY}`
      },
      params: {
        query: topic,
        page: currentPage,
        per_page: 12,
      }
    });
      
    const dataImg = response.data.results
    
     if (!dataImg || dataImg.length === 0) {
      return []; 
    }

    return dataImg.map(image => ({
       id: image.id,
      small: image.urls.small,
      regular: image.urls.regular,  
      instagram_username: image.user.instagram_username,
      username: image.user.username,
      location: image.user.location,
      total_likes: image.likes
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error; 
  }
}


// export const getImages = async (topic, currentPage) => {
//   try {
//     const response = await axios.get("/search/photos", {
//       headers: {
//         authorization: `Client-ID ${API_KEY}`
//       },
//       params: {
//         query: topic,
//         page: currentPage,
//         per_page: 12,
//       }
//     });
      
//     const dataImg = response.data.results
    
//      if (!dataImg || dataImg.length === 0) {
//       return []; 
//     }

//     return dataImg.map(image => ({
//        id: image.id,
//       small: image.urls.small,
//       regular: image.urls.regular,  
//       instagram_username: image.user.instagram_username,
//       username: image.user.username,
//       location: image.user.location,
//       total_likes: image.likes
//     }));
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     throw error; 
//   }
// }