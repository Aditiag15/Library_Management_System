import cron from "node-cron";
import { Borrow } from "../server/models/borrowModel.js";
import { User } from "../server/models/userModel.js";
import { sendEmail } from "../server/utils/sendEmail.js";

export const notifyUsers = () =>{
    cron.schedule("*/10 * * * * *",async()=>{
        try{
            const oneDayAgo = new Date(Date.now()-24*60*60*1000);
            const borrowers = await Borrow.find({
                dueDate:{
                    $lt: oneDayAgo
                },
                returnDate: null,
                notified: false,
            });
            for(const element of borrowers){
                if(element.user && element.user.email){
                    const user= await User.findById(element.user.id);
                    sendEmail({
                        email,
                        subject: "Book return remainder",
                        message: `Hello ${element.user.name},\nThis is a remainder that the book you borrowed is due for return today.Please return the book to the library as soon as possible\n\nThank you`,
                    });
                    element.notified = true,
                    await element.save();
                    console.log(`Email sent to ${element.user.email}`);
                }
            }
        }catch(error){
            console.error("Some error  occurred while notifying users",error);
        }
    });
};