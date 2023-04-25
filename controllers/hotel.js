import Hotel from "../models/hotel.js";

//Create Hotel
export const createHotel = async(req , res , next)=>{
        const newHotel = new Hotel(req.body);
        try{
            const savedHotel = await newHotel.save();
            res.status(200).json(savedHotel);
        }
        catch{
            next(err);
        }
}

//update Hotel
export const updateHotel = async(req , res , next)=>{
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id , {$set: req.body} , { new: true});
        res.status(200).json(updateHotel);
    }
    catch{
        next(err);
    }
}

//Delete Hotel
export const deleteHotel = async(req , res , next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    }
    catch{
        next(err);
    }
}



//Get Hotel
export const getHotel = async(req , res , next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }
    catch{
        next(err);
    }
}

//Get All Hotels
export const getHotels = async(req , res , next)=>{
    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    }
    catch(err)
    {
        next(err);
    }
}