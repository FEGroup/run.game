var run=run||{};run.Class=function(){"use strict";return ClassUtil.extend({get:function(t){if(this.hasOwnProperty(t))return this[t];throw new Error("no such config value : "+t)},set:function(t,e){return this[t]=e,this.trigger("change:"+t),this},addEventListener:function(t,e){"string"==typeof t&&"function"==typeof e&&(this.eventListenerObj=this.eventListenerObj||{},this.eventListenerObj[t]=this.eventListenerObj[t]||[],this.eventListenerObj[t].push(e))},removeEventListener:function(t,e){if(this.eventListenerObj[t]){var i=this.eventListenerObj[t].indexOf(e);i>-1&&(this.eventListenerObj[t].splice(i,1),0===this.eventListenerObj[t].length&&(this.eventListenerObj[t]=null))}},on:function(t,e){return this.addEventListener(t,e),this},off:function(t,e){return this.removeEventListener(t,e),this},trigger:function(t,e){this.dispatchEvent(new Event(t),e)},dispatchEvent:function(t){if(this.eventListenerObj&&this.eventListenerObj.hasOwnProperty(t.type)!==!1)for(var e in this.eventListenerObj[t.type])this.eventListenerObj[t.type][e].apply(null,arguments)},hasEventListener:function(t){return this.eventListenerObj[t]&&0!==this.eventListenerObj[t].length?!0:!1}})}(),run.PreLoader={preload:function(t,e){var i,n,s={},r=0,o=0,h=function(n){t[i].imageObj=n.currentTarget,++o>=r&&e(s)};for(i in t)r++,s[i]={},n=s[i].imageObj=new Image,n.onload=h,n.src=t[i].img},load:function(t){this.preload(run.Sources,function(e){var i;for(i in e)run.Sources[i].imageObj=e[i].imageObj;t&&t()})}},run.Sources=function(){"use strict";return{hero:{img:"img/char.png",frames:{run:[[44,53,16,28,0,0,0],[62,53,16,28,0,0,0],[81,53,16,28,0,0,0]],jump:[[119,53,16,28,0,0,0]],dead:[[225,53,16,28,0,0,0]]},height:27,width:16,imageObj:null},bottomTerrain:{img:"img/bg2.png",frames:{bg:[[431,373,60,33]]},imageObj:null},bg:{img:"img/bg.png",imageObj:null,stages:[[0,0,256,256,0,0,0]]},trap:{img:"img/bg2.png",frames:{trap1:[[13,152,16,16],[31,152,16,16],[49,152,16,16],[67,152,16,16]]},imageObj:null},item:{img:"img/bg2.png",frames:{normalCoin:[[140,48,6,16],[147,48,10,16],[158,48,14,16],[173,48,10,16]]},imageObj:null}}}(),run.Rules=function(){"use strict";var t=run.Class.extend({defaults:{MINIMUM_CREATE_DIS:60,TERRAIN_MAP_GROUP:[[0,0,0,0,0],[0,3,0,0],[0,0,4,0,0,4,0,0]],AVAILABLE_TERRAINS:[[0,1],[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]],ITEMS_MAP:[[0,0,0,0,0,0,0],[0,20,40,60,40,20,0]],ITEM_MAP_GROUP:[[0,1]],SPEED_OF_LEVEL:[15,18,20,25,30,40,50]}});return new t}(),run.Config=function(){"use strict";var t=run.Class.extend({defaults:{STAGE_WIDTH:600,STAGE_HEIGHT:300,FPS:25,GRAVITY:8,INIT_JUMP_VELOCITY:-40,TERRAIN_BOTTOM_Y:267,ITEM_INTERVAL_X:30}});return new t}(),run.StackCollection=function(){return run.Class.extend({defaults:{updateStack:[]},initialize:function(){this.updateStack=[]},add:function(t){this.updateStack.push(t)},find:function(){},each:function(t){this.updateStack.forEach(t)}})}(),run.Stage=function(){"use strict";return run.Class.extend({defaults:{frameTime:null,startTime:null,isStarted:!0},initialize:function(t){this.ctx=t,this.initPixelHack()},initPixelHack:function(){this.ctx.mozImageSmoothingEnabled=!1,this.ctx.webkitImageSmoothingEnabled=!1,this.ctx.msImageSmoothingEnabled=!1,this.ctx.imageSmoothingEnabled=!1},getContext:function(){return this.ctx},clearContext:function(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)},animate:function(){this.frameTime=this.startTime=(new Date).getTime(),this.isStarted=!0,requestAnimationFrame(this.tick.bind(this))},pause:function(){this.isStarted=!1},stop:function(){this.isStarted=!1,this.startTime=0,this.clearContext()},getVisibleTime:function(){var t=1e3/run.Config.get("FPS"),e=(new Date).getTime(),i=e-this.frameTime;return Math.floor(i/t)},tick:function(){this.isStarted&&(this.getVisibleTime()>0&&(this.frameTime=(new Date).getTime(),this.dispatchEvent(new Event("enterframe"))),requestAnimationFrame(this.tick.bind(this)))}})}(),run.MainModel=function(){return run.Class.extend({defaults:{speed:0,distance:0,level:0,score:100},initialize:function(){}})}(),run.HeroModel=function(){return run.Class.extend({defaults:{x:0,y:0,width:0,height:0,currentFrame:0,totalFrames:0,scale:2,xVel:5,yVel:0,prevRect:{x:0,y:0,w:0,h:0},isDoubleJumping:!1,mode:"",MODE:{D_MODE:"dead",R_MODE:"run",J_MODE:"jump"}},initialize:function(){},nextFrame:function(){this.currentFrame++,this.currentFrame>=this.totalFrames&&(this.currentFrame=0)}})}(),run.TerrainModel=function(){return run.Class.extend({defaults:{TYPE:{BOTTOM:0,SECOND:1,THIRD:2,CLIFF:3,TRAP:4},gMap:[],currentID:0,startX:0,endX:0,Events:{CHANGE:"terrain_change",REMOVE:"terrain_remove"}},initialize:function(){this.gMap=[]},removeTerrain:function(t){null!==t&&(this.gMap.splice(this.gMap.indexOf(t),1),this.dispatchEvent(new Event(this.Events.REMOVE)))},addTerrain:function(t){null!==t&&(this.currentID++,this.gMap.push(t),this.dispatchEvent(new Event(this.Events.CHANGE)))}})}(),run.ItemModel=function(){return run.Class.extend({defaults:{itemList:[],currentID:0,endX:0},initialize:function(){this.itemList=[]},removeItem:function(t){null!==t&&this.itemList.splice(this.itemList.indexOf(t),1)},addItem:function(t){null!==t&&(this.currentID++,this.itemList.push(t))}})}(),run.ModelCollection=function(){return run.Class.extend({defaults:{MODEL:{TERRAIN:"terrain",ITEM:"item",HERO:"hero",MAIN:"main"}},initialize:function(){},getModel:function(t){return this[t]?this[t]:void 0}})}(),run.GameController=function(){"use strict";return run.Class.extend({defaults:{startTime:0,modelCollection:null,model:null,heroModel:null,oHeroControl:null,terrainControl:null,itemControl:null,stage:null,oStackCollection:null},initialize:function(t){this.initStage(t),this._bindKeyEvents()},initStage:function(t){this.stage=t,this.stage.on("enterframe",this._tick.bind(this))},initModels:function(){this.modelCollection=new run.ModelCollection,this.oStackCollection=new run.StackCollection,this.model=new run.MainModel,this.heroModel=new run.HeroModel,this.modelCollection.set("main",this.model).set("hero",this.heroModel).set("terrain",new run.TerrainModel).set("item",new run.ItemModel),this._initTerrain(),this._initItem(),this._initHero(),this.setModelEvents()},setModelEvents:function(){this.heroModel.on("deadEvent",this._onDeadHero.bind(this)),this.model.on("change:distance",function(){this.model.set("score",10*this.model.get("distance"))}.bind(this)).on("change:score",function(){this.trigger("change:score")}.bind(this))},start:function(){this.stop(),this._startAnimation()},stop:function(){this.stage.stop(),this.initModels(),this._initSetting()},pause:function(){this.stage.pause()},resume:function(){this.stage.animate()},getScore:function(){return this.model.get("score")},_startAnimation:function(){this.stage.animate()},_initSetting:function(){this.model.set("level",0),this.model.set("speed",run.Rules.SPEED_OF_LEVEL[this.model.get("level")])},_initTerrain:function(){this.terrainControl=new run.TerrainController(this.stage.getContext(),this.modelCollection),this.oStackCollection.add(this.terrainControl)},_initItem:function(){this.itemControl=new run.ItemController(this.stage.getContext(),this.modelCollection),this.oStackCollection.add(this.itemControl)},_initHero:function(){this.oHeroControl=new run.HeroController(this.stage.getContext(),this.modelCollection),this.oStackCollection.add(this.oHeroControl)},_onDeadHero:function(){this.model.set("speed",0)},_initFrames:function(){this.oStackCollection.each(function(t){t.initFrame()})},_updateFrames:function(){this.oStackCollection.each(function(t){t.update()})},_tick:function(){if(this.stage.clearContext(),0===this.stage.startTime)return this._initFrames();this._updateFrames();var t=this.model.get("distance");this.model.set("distance",t+this.model.get("speed"))},_bindKeyEvents:function(){$(window).on("keydown",$.proxy(this._keyDownHandler,this)).on("touchstart",$.proxy(function(){this.oHeroControl.jump()},this)).on("keyup",$.proxy(this._keyUpHandler,this))},_keyDownHandler:function(t){switch(t.preventDefault(),t.keyCode){case 32:this.oHeroControl.jump();break;case 37:this.moveLeft=!0;break;case 38:break;case 39:this.moveRight=!0;break;case 40:}},_keyUpHandler:function(t){switch(t.keyCode){case 37:this.moveLeft=!1;break;case 39:this.moveRight=!1}}})}(),run.View=function(){"use strict";return run.Class.extend({defaults:{},initialize:function(t){this._ctx=t},draw:function(){}})}(),run.Terrain=function(){"use strict";return run.View.extend({defaults:{model:null,id:-1,type:-1,width:0,height:0,x:0,y:0,imageX:0,imageY:0,currentFrame:0,totalFrames:-1,image:null,frameArr:null},initialize:function(t,e,i){switch(this.model=t,this.id=i,this.type=e,this.currentFrame=0,e){case this.model.TYPE.BOTTOM:this.frameArr=run.Sources.bottomTerrain.frames.bg,this.totalFrames=this.frameArr.length,this.image=run.Sources.bottomTerrain.imageObj,this.setImageRect();break;case this.model.TYPE.SECOND:break;case this.model.TYPE.THIRD:break;case this.model.TYPE.CLIFF:this.image=null,this.width=run.Rules.MINIMUM_CREATE_DIS,this.height=0;break;case this.model.TYPE.TRAP:}},setImageRect:function(){var t=this.frameArr[this.currentFrame];this.imageX=t[0],this.imageY=t[1],this.width=t[2],this.height=t[3]},draw:function(t,e,i){if(this.x=e,this.y=i,this.image){this.setImageRect(),this.currentFrame++,this.currentFrame===this.totalFrames&&(this.currentFrame=0);var n={x:this.x,y:this.y,w:this.width,h:this.height};t.drawImage(this.image,this.imageX,this.imageY,this.width,this.height,n.x,n.y,n.w,n.h)}}})}(),run.Hero=function(){"use strict";return run.View.extend({defaults:{model:null},initialize:function(t){this.model=t},draw:function(t,e){var i=e.frames[this.model.get("mode")][this.model.get("currentFrame")],n=this.model.get("x"),s=this.model.get("y"),r=this.model.get("scale"),o={x:n,y:s,w:i[2]*r,h:i[3]*r};t.drawImage(e.imageObj,i[0],i[1],i[2],i[3],o.x-o.w/2,o.y-o.h,o.w,o.h)}})}(),run.Item=function(){"use strict";return run.View.extend({defaults:{model:null,id:-1,type:-1,width:0,height:0,x:0,y:0,imageX:0,imageY:0,currentFrame:0,totalFrames:0,image:null,frameArr:null},initialize:function(t,e,i){this.id=i,this.src=t,this.frames=e,this.currentFrame=0,this.totalFrames=this.frames.length,this.image=this.src,this.setImageRect()},setImageRect:function(){var t=this.frames[this.currentFrame];this.imageX=t[0],this.imageY=t[1],this.width=t[2],this.height=t[3]},draw:function(t,e,i){if(this.x=e,this.y=i,this.image){this.setImageRect(),this.currentFrame++,this.currentFrame===this.totalFrames&&(this.currentFrame=0);var n={x:this.x,y:this.y,w:this.width,h:this.height};t.drawImage(this.image,this.imageX,this.imageY,this.width,this.height,n.x-n.w/2,n.y-n.h/2,n.w,n.h)}}})}(),run.Bg=function(){"use strict";return run.View.extend({defaults:{model:null,id:-1,type:-1,width:0,height:0,x:0,y:0,image:null},initialize:function(t,e,i){this.model=t,this.id=i,this.type=e},draw:function(t,e,i){this.x=e,this.y=i,null!==this.image&&t.drawImage(this.image,e,i,this.width,this.height)}})}(),run.ViewController=function(){"use strict";return run.Class.extend({defaults:{},initialize:function(){},update:function(){}})}(),run.TerrainController=function(){"use strict";return run.ViewController.extend({defaults:{mainModel:null,model:null,ctx:null,typeObj:null,maps:null},initialize:function(t,e){this.ctx=t,this.model=e.getModel(e.MODEL.TERRAIN),this.mainModel=e.getModel(e.MODEL.MAIN),this.typeObj=this.model.get("TYPE"),this.maps=this.model.get("gMap"),this._initSetting()},_initSetting:function(){this.addTerrainGroup(run.Rules.TERRAIN_MAP_GROUP[0]),this.addTerrainGroup(run.Rules.TERRAIN_MAP_GROUP[0]),this.addTerrainGroup(run.Rules.TERRAIN_MAP_GROUP[0]),this.addTerrainGroup(run.Rules.TERRAIN_MAP_GROUP[0])},createTerrain:function(t){var e,i,n=this.model.get("currentID");switch(t){case this.typeObj.BOTTOM:e=new run.Terrain(this.model,t,n),i={terrain:e,id:n,x:this.model.get("endX"),y:run.Config.TERRAIN_BOTTOM_Y},this.model.set("endX",this.model.get("endX")+e.width);break;case this.typeObj.SECOND:break;case this.typeObj.THIRD:break;case this.typeObj.CLIFF:e=new run.Terrain(this.model,t,n),i={terrain:e,id:n,x:this.model.get("endX"),y:run.Config.TERRAIN_BOTTOM_Y},this.model.set("endX",this.model.get("endX")+e.width);break;case this.typeObj.TRAP:}return i},checkTerrain:function(){if(this.model.get("endX")-this.mainModel.get("speed")<=run.Config.STAGE_WIDTH){var t=Math.floor(Math.random()*run.Rules.AVAILABLE_TERRAINS[this.mainModel.get("level")].length);this.addTerrainGroup(run.Rules.TERRAIN_MAP_GROUP[run.Rules.AVAILABLE_TERRAINS[this.mainModel.get("level")][t]]),this.checkTerrain()}},addTerrainGroup:function(t){for(var e=0;e<t.length;)this.model.addTerrain(this.createTerrain(t[e])),e++},update:function(){var t,e=0,i=this.mainModel.get("speed");for(this.checkTerrain(),this.model.set("startX",this.model.get("startX")-i),this.model.set("endX",this.model.get("endX")-i);e<this.maps.length;)t=this.maps[e],t.x-=i,t.x+t.terrain.width<=0?this.model.removeTerrain(t):(t.terrain.draw(this.ctx,t.x,t.y),e++)}})}(),run.ItemController=function(){"use strict";return run.ViewController.extend({defaults:{ctx:null,model:null,mainModel:null,maps:null},initialize:function(t,e){this.ctx=t,this.model=e.getModel(e.MODEL.ITEM),this.mainModel=e.getModel(e.MODEL.MAIN),this.maps=this.model.get("itemList"),this._initSetting()},_initSetting:function(){},checkItem:function(){if(this.model.get("endX")-this.mainModel.get("speed")<=run.Config.STAGE_WIDTH){var t=run.Rules.ITEM_MAP_GROUP[this.mainModel.get("level")];this.addItemGroup(run.Rules.ITEMS_MAP[t[Math.floor(Math.random()*t.length)]]),this.checkItem()}},createItem:function(t,e){var i;return 0===e&&(i={x:this.model.get("endX")+run.Config.ITEM_INTERVAL_X,y:run.Config.TERRAIN_BOTTOM_Y-t-20,item:new run.Item(run.Sources.item.imageObj,run.Sources.item.frames.normalCoin,this.model.get("currentID"))},this.model.set("endX",this.model.get("endX")+run.Config.ITEM_INTERVAL_X)),i},addItemGroup:function(t){for(var e=0,i=0;e<t.length;)this.model.addItem(this.createItem(t[e],i)),e++},update:function(){var t,e=0,i=this.mainModel.get("speed");for(this.checkItem();e<this.maps.length;)t=this.maps[e],t.x-=i,t.x+t.item.width<=0?this.model.removeItem(t):(t.item.draw(this.ctx,t.x,t.y),e++);this.model.set("endX",this.model.get("endX")-i)}})}(),run.BgController=function(){"use strict";return run.ViewController.extend({defaults:{mainModel:null,model:null,ctx:null,typeObj:null,maps:null},initialize:function(t,e){this.ctx=t,this.model=e.getModel(e.MODEL.TERRAIN),this.mainModel=e.getModel(e.MODEL.MAIN),this.typeObj=this.model.get("TYPE"),this.maps=this.model.get("gMap"),this._initSetting()},_initSetting:function(){this.checkTerrain()},createTerrain:function(t){var e,i,n=this.model.get("currentID");switch(t){case this.typeObj.BOTTOM:e=new run.Terrain(this.model,t,n),i={terrain:e,id:n,x:this.model.get("endX"),y:run.Config.TERRAIN_BOTTOM_Y},this.model.set("endX",this.model.get("endX")+e.width);break;case this.typeObj.SECOND:break;case this.typeObj.THIRD:break;case this.typeObj.CLIFF:e=new run.Terrain(this.model,t,n),i={terrain:e,id:n,x:this.model.get("endX"),y:run.Config.TERRAIN_BOTTOM_Y},this.model.set("endX",this.model.get("endX")+e.width);break;case this.typeObj.TRAP:}return i},checkTerrain:function(){if(this.model.get("endX")-this.mainModel.get("speed")<=run.Config.STAGE_WIDTH){for(var t=0,e=run.Rules.AVAILABLE_TERRAINS[this.mainModel.get("level")],i=run.Rules.TERRAIN_MAP_GROUP[Math.floor(Math.random()*e.length)];t<i.length;)this.model.addTerrain(this.createTerrain(i[t])),t++;this.checkTerrain()}},update:function(){var t,e=0,i=this.mainModel.get("speed");for(this.checkTerrain(),this.model.set("startX",this.model.get("startX")-i),this.model.set("endX",this.model.get("endX")-i);e<this.maps.length;)t=this.maps[e],t.x-=i,t.x+t.terrain.width<=0?this.model.removeTerrain(t):(t.terrain.draw(this.ctx,t.x,t.y),e++)}})}(),run.HeroController=function(){"use strict";return run.ViewController.extend({defaults:{hero:null,heroModel:null,terrainModel:null,ctx:null,terrainMap:null,name:"",src:null},initialize:function(t,e){this.heroModel=e.getModel(e.MODEL.HERO),this.terrainModel=e.getModel(e.MODEL.TERRAIN),this.terrainMap=this.terrainModel.get("gMap"),this.hero=new run.Hero(this.heroModel),this.ctx=t,this._initSetting()},_initSetting:function(){this.name="hero",this.src=run.Sources[this.name],this.setValue("currentFrame",0),this.setPoint(100,-50),this.setValue("width",run.Sources.hero.width),this.setValue("height",run.Sources.hero.height),this.setMode(this.heroModel.MODE.J_MODE)},setValue:function(t,e){this.heroModel.set(t,e)},setMode:function(t){this.setValue("mode",t),this.setValue("totalFrames",this.src.frames[this.heroModel.get("mode")].length),t===this.heroModel.MODE.D_MODE?this.heroModel.trigger("deadEvent"):t===this.heroModel.MODE.R_MODE&&this.setValue("isDoubleJumping",!1)},initFrame:function(){this.setValue("currentFrame",0)},update:function(){var t={x:this.heroModel.get("x"),y:this.heroModel.get("y")+this.heroModel.get("yVel"),width:this.heroModel.get("width")*this.heroModel.get("scale"),height:this.heroModel.get("height")*this.heroModel.get("scale")},e=this.getCollisionTerrain(t);switch(this.heroModel.get("mode")){case this.heroModel.MODE.J_MODE:this.setValue("yVel",this.heroModel.get("yVel")+run.Config.get("GRAVITY")),this.proceedCollision(e)===!1&&this.setPoint(null,this.heroModel.get("y")+this.heroModel.get("yVel")),this.heroModel.get("y")>run.Config.get("STAGE_HEIGHT")&&this.setMode(this.heroModel.MODE.D_MODE);break;case this.heroModel.MODE.R_MODE:this.proceedCollision(e);break;case this.heroModel.MODE.D_MODE:}this.hero.draw(this.ctx,this.src),this.heroModel.nextFrame()},proceedCollision:function(t){var e,i=0,n=!1;if(null!==t){for(;i<t.length;){if(e=t[i],this.heroModel.get("mode")===this.heroModel.MODE.J_MODE&&this.heroModel.get("yVel")>=0&&(e.type===this.terrainModel.TYPE.BOTTOM||e.type===this.terrainModel.TYPE.SECOND||e.type===this.terrainModel.TYPE.THIRD)&&(this.setPoint(null,e.y),this.setValue("yVel",0),this.setMode(this.heroModel.MODE.R_MODE),n=!0),e.type===this.terrainModel.TYPE.TRAP){this.setValue("yVel",3),this.setValue("currentFrame",0),this.setMode(this.heroModel.MODE.D_MODE),n=!0;break}if(this.heroModel.get("mode")===this.heroModel.MODE.R_MODE&&e.type===this.terrainModel.TYPE.CLIFF){this.setValue("yVel",3),this.setValue("currentFrame",0),this.setMode(this.heroModel.MODE.J_MODE),n=!0;break}i++}return n}},getCollisionTerrain:function(t){for(var e=0,i=null,n=[],s=this.heroModel.prevRect;e<this.terrainMap.length;)i=this.terrainMap[e].terrain,i.type===this.terrainModel.TYPE.BOTTOM||i.type===this.terrainModel.TYPE.SECOND||i.type===this.terrainModel.TYPE.THIRD||i.type===this.terrainModel.TYPE.CLIFF?(t.x>=i.x&&t.x<i.x+i.width&&t.y>=i.y&&t.y<=i.y+i.height||this.AABB({x:s.x,y:s.y,width:1,height:t.y-s.y},i)===!0)&&n.push(i):this.AABB({x:t.x-t.width/2,y:t.y-t.height,width:t.width,height:t.height},i)===!0&&n.push(i),e++;return n},AABB:function(t,e){return t.x<e.x+e.width&&t.x+t.width>e.x&&t.y<e.y+e.height&&t.height+t.y>e.y?!0:!1},jump:function(){var t=this.heroModel.get("mode");t===this.heroModel.MODE.R_MODE?(this.setValue("currentFrame",0),this.setValue("yVel",run.Config.get("INIT_JUMP_VELOCITY")),this.setMode(this.heroModel.MODE.J_MODE)):t===this.heroModel.MODE.J_MODE&&this.heroModel.get("isDoubleJumping")===!1&&(this.setValue("isDoubleJumping",!0),this.setValue("yVel",run.Config.get("INIT_JUMP_VELOCITY")))},moveRight:function(){this.setValue("x",this.heroModel.get("x")+this.heroModel.get("xVel"))},moveLeft:function(){this.setValue("x",this.heroModel.get("x")-this.heroModel.get("xVel"))},setPoint:function(t,e){this.heroModel.prevRect={x:this.heroModel.get("x"),y:this.heroModel.get("y"),w:this.heroModel.get("width"),h:this.heroModel.get("height")},null!==t&&this.setValue("x",t),null!==e&&this.setValue("y",e)}})}();var app=function(){"use strict";var t=function(t){var e=document.getElementById(t),i=e.getContext("2d"),n=new run.Stage(i),s=new run.GameController(n);return s.start(),s};return{initUi:function(t){t.on("change:score",function(){$("#_score").val(t.getScore())}),$("#_start_btn").on("click",function(){t.start()}),$("#_stop_btn").on("click",function(){t.stop()}),$("#_pause_btn").on("click",function(){t.pause()}),$("#_resume_btn").on("click",function(){t.resume()})},initRunGame:function(){var e=t("_stage");this.initUi(e),t("_stage2"),t("_stage3")},start:function(){run.PreLoader.load(this.initRunGame.bind(this))}}}();app.start();