const ActiveSale = require("../Modals/ActiveSalesModal");
module.exports.findByID = async (id) => {
  try {
    let check = await ActiveSale.findById(id);
    if(check._id){return true} else{return false}
  } catch (err) {
    return null;
  }
};
module.exports.insert = async (data) => {
  try {
    const response =await ActiveSale.create(data);
    if(response._id){return true} else{return false}
  } catch (err) {
    return null;
  }
};
module.exports.updateOne = async (id, data) => {
  try {
    const response =await ActiveSale.updateOne(
      {
        _id: id,
      },
      { $push: { sales: [data] } }
    );
    if(response.nModified){return true}else {return false}
  } catch (err) {
    return null;
  }
};
module.exports.getById = async (id) =>{
  try{
    let check = await ActiveSale.findById(id);
    if(check._id){return check}else{return null}
  }catch(err){
     return null;
  }
}
