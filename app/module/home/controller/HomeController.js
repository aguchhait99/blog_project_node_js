

class HomeController {
    // Dashboard Page
    async dashboard(req, res){
        try{
            res.render('dashboard')
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new HomeController();
