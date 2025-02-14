const Listing = require("../models/listing.js");
const {getCoordinates} = require("../public/js/findCor.js");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req,res)=>{    
    res.render("listings/new.ejs");             //New Route is place before show route due to some conflict occuring
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
        path: "author",
        },
    })
    .populate("owner");
    if (!listing) {
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async (req, res, next) => {
        let url = req.file.path;
        let filename = req.file.filename;

        let location = req.body.listing.location;

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image.url = url;
        newListing.image.filename = filename;
        try {
            let coordinates = await getCoordinates(location);
            newListing.geometry = { type: "Point", coordinates };  // ✅ GeoJSON format
            await newListing.save();
            console.log(newListing);
            req.flash("success", "New Listing Created!");
            res.redirect("/listings");
        } catch (err) {
            console.error("Error fetching coordinates:", err);
            req.flash("error", "Failed to fetch coordinates.");
            res.redirect("/listings/new");
        }
  };

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing,originalImageUrl});
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let newListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if (typeof req.file!=="undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url,filename};
        await newListing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let del = await Listing.findByIdAndDelete(id);
   // console.log(del);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};