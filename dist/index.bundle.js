module.exports=function(e){var t={};function r(u){if(t[u])return t[u].exports;var n=t[u]={i:u,l:!1,exports:{}};return e[u].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,u){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:u})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var u=Object.create(null);if(r.r(u),Object.defineProperty(u,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(u,n,function(t){return e[t]}.bind(null,n));return u},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const u={JWT_SECRET:"thisisasecret",MONGO_URL:"mongodb://localhost/restapi-dev"},n={MONGO_URL:"mongodb://localhost/restapi-test"},s={JWT_SECRET:"thisisasecret",MONGO_URL:"mongodb://localhost/restapi-prod"},o={PORT:process.env.PORT||3e3};t.default=Object.assign({},o,function(e){switch(e){case"development":return u;case"test":return n;default:return s}}("production"))},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("passport")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.authJwt=t.authLocal=void 0;var u=a(r(3)),n=a(r(17)),s=r(18),o=a(r(5)),i=a(r(0));function a(e){return e&&e.__esModule?e:{default:e}}const l=new n.default({usernameField:"email"},async(e,t,r)=>{try{const u=await o.default.findOne({email:e});return u&&u.authenticateUser(t)?r(null,u):r(null,!1)}catch(e){return r(e,!1)}}),d={jwtFromRequest:s.ExtractJwt.fromAuthHeader("authorization"),secretOrKey:i.default.JWT_SECRET},c=new s.Strategy(d,async(e,t)=>{try{const r=await o.default.findById(e._id);return t(null,r?r:!1)}catch(e){return t(e,!1)}});u.default.use(l),u.default.use(c);t.authLocal=u.default.authenticate("local",{session:!1}),t.authJwt=u.default.authenticate("jwt",{session:!1})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),n=c(u),s=c(r(19)),o=r(20),i=c(r(21)),a=c(r(24)),l=r(6),d=c(r(0));function c(e){return e&&e.__esModule?e:{default:e}}const f=new u.Schema({email:{type:String,unique:!0,required:[!0,"Email is required!"],trim:!0,validate:{validator:e=>s.default.isEmail(e),message:"{VALUE} is not a valid email!"}},firstName:{type:String,required:[!0,"First name is required"],trim:!0},lastName:{type:String,required:[!0,"Last name is required"],trim:!0},userName:{type:String,required:[!0,"Username is required"],trim:!0},password:{type:String,required:[!0,"Password is required!"],trim:!0,minlength:[6,"Password need to be longer!"],validate:{validator:e=>l.passwordReg.test(e),message:"{VALUE} is not a valid password!"}}},{timestamps:!0});f.plugin(a.default,{message:"{VALUE} already taken!"}),f.pre("save",function(e){return this.isModified("password")&&(this.password=this._hashPassword(this.password)),e()}),f.methods={_hashPassword:e=>(0,o.hashSync)(e),authenticateUser(e){return(0,o.compareSync)(e,this.password)},createToken(){return i.default.sign({_id:this._id},d.default.JWT_SECRET)},toJSON(){return{_id:this._id,userName:this.userName,token:`Passport-JWT ${this.createToken()}`}}},t.default=n.default.model("User",f)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.passwordReg=void 0;var u=function(e){return e&&e.__esModule?e:{default:e}}(r(22));const n=t.passwordReg=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;t.default={signup:{body:{email:u.default.string().email().required(),password:u.default.string().regex(n).required(),firstName:u.default.string().required(),lastName:u.default.string().required(),userName:u.default.string().required()}}}},function(e,t,r){"use strict";var u=i(r(1)),n=i(r(0));r(8);var s=i(r(9)),o=i(r(14));function i(e){return e&&e.__esModule?e:{default:e}}const a=(0,u.default)();(0,s.default)(a),a.get("/",(e,t)=>{t.send("Hello World")}),(0,o.default)(a),a.listen(n.default.PORT,e=>{if(e)throw e;console.log(`\n    Server is running on port: ${n.default.PORT}\n    --------\n    Running on production\n    --------\n    Let's get it!!\n    `)})},function(e,t,r){"use strict";var u=s(r(2)),n=s(r(0));function s(e){return e&&e.__esModule?e:{default:e}}u.default.Promise=global.Promise;try{u.default.connect(n.default.MONGO_URL)}catch(e){u.default.createConnection(n.default.MONGO_URL)}u.default.connection.once("open",()=>console.log("MongoDB Running")).on("error",e=>{throw e})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=i(r(10)),n=(i(r(11)),i(r(12))),s=i(r(13)),o=i(r(3));function i(e){return e&&e.__esModule?e:{default:e}}t.default=(e=>{e.use((0,n.default)()),e.use((0,s.default)()),e.use(u.default.json()),e.use(u.default.urlencoded({extended:!0})),e.use(o.default.initialize())})},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("helmet")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=s(r(15)),n=s(r(25));function s(e){return e&&e.__esModule?e:{default:e}}t.default=(e=>{e.use("/api/v1/users",u.default),e.use("/api/v1/posts",n.default)})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=r(1),n=a(r(16)),s=r(4),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(23)),i=a(r(6));function a(e){return e&&e.__esModule?e:{default:e}}const l=new u.Router;l.post("/signup",(0,n.default)(i.default.signup),o.signUp),l.post("/login",s.authLocal,o.login),t.default=l},function(e,t){e.exports=require("express-validation")},function(e,t){e.exports=require("passport-local")},function(e,t){e.exports=require("passport-jwt")},function(e,t){e.exports=require("validator")},function(e,t){e.exports=require("bcrypt-nodejs")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t){e.exports=require("joi")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.signUp=async function(e,t){try{const r=await u.default.create(e.body);return t.status(201).json(r)}catch(e){return t.status(500).json(e)}},t.login=function(e,t,r){return t.status(200).json(e.user),r()};var u=function(e){return e&&e.__esModule?e:{default:e}}(r(5))},function(e,t){e.exports=require("mongoose-unique-validator")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=r(1),n=a(r(16)),s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(26)),o=r(4),i=a(r(29));function a(e){return e&&e.__esModule?e:{default:e}}const l=new u.Router;l.post("/",o.authJwt,(0,n.default)(i.default.createPost),s.createPost),t.default=l},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createPost=async function(e,t){try{const r=await u.default.createPost(e.body,e.user._id);return t.status(201).json(r)}catch(e){return t.status(400).json(e)}};var u=function(e){return e&&e.__esModule?e:{default:e}}(r(27))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=r(2),n=i(u),s=i(r(28)),o=i(r(24));function i(e){return e&&e.__esModule?e:{default:e}}const a=new u.Schema({title:{type:String,trim:!0,required:[!0,"Title is required!"],minlength:[3,"Title need to be longer!"],unique:!0},text:{type:String,trim:!0,required:[!0,"Text is required!"],minlength:[10,"Text need to be longer!"]},slug:{type:String,trim:!0,lowercase:!0},user:{type:u.Schema.Types.ObjectId,ref:"User"},favoriteCount:{type:Number,default:0}},{timestamps:!0});a.plugin(o.default,{message:"{VALUE} already taken!"}),a.methods={_slugify(){this.slug=(0,s.default)(this.title)},toJSON(){return{_id:this._id,title:this.title,text:this.text,createdAt:this.createdAt,slug:this.slug,user:this.user,favoriteCount:this.favoriteCount}}},a.statics={createPost(e,t){return this.create(Object.assign({},e,{user:t}))}},t.default=n.default.model("Post",a)},function(e,t){e.exports=require("slug")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){return e&&e.__esModule?e:{default:e}}(r(22));t.default={createPost:{body:{title:u.default.string().min(3).required(),text:u.default.string().min(10).required()}}}}]);