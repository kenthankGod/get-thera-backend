const { default: mongoose } = require("mongoose");
const { Bookings } = require("../model/Bookings");


// GET SPECIFIC BOOKINGS OF A USER
//  descriptsion: get bookings 
// route: /allBookings
//  access: private route
module.exports.getBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find({ user: req.user.id });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//  POST SPECIFIC BOOKINGS OF A USER
//  descriptsion: post bookings 
// route: /addBookings
//  access: private route
module.exports.setBooking = async (req, res) => {
  try {
    const booking = await Bookings.create({
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      amount: req.body.amount,
      duration: req.body.duration,
      user: req.user.id,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//  DELETE SPECIFIC BOOKINGS OF A USER
//  descriptsion: delete bookings 
// route: /deleteBookings
//  access: private route
module.exports.deleteBooking = async (req, res) => {

// try {
//   const booking = await Bookings.findById(req.params.id);

//   if (!booking) {
//     return res.status(404).json({ error: "No such booking" });
//   }
  
//   res.status(200).json({ message: "booking successfully deleted" });

//   await booking.remove()
// } catch (error) {
//   console.log(error)
//   res.status(400).json({ error: error.message });
// }

const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({error: 'No such booking'})
}

const booking = await Bookings.findByIdAndDelete({_id: id});

  if (!booking) {
    return res.status(404).json({ error: "No such booking" });
  }

  res.status(200).json({ message: "booking successfully deleted" });
  

};



module.exports.helloGet = async (req, res) => {
  res.send("testing booking route")
};