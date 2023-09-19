const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log("rolesArray");
    console.log(rolesArray);
    console.log(req.roles);
    const result = req.roles.filter(role => rolesArray.includes(role)).length
    console.log(result);
    if(!result) return res.sendStatus(401);
    next()
  };
};
module.exports = verifyRoles;
