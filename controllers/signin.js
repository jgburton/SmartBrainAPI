const handleSignin = ('/signin', (req, res, db, bcrypt) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('User not found'))
            } else {
                res.status(400).json('wrong crednetials')
            }
        })
        .catch(err => res.status(400).json('wrong crednetials'))
})

module.exports = {
    handleSignin: handleSignin
}