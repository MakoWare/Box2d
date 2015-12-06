import BaseApp from 'src/components/app/BaseApp';
import Box2D from 'src/components/box2d/box2d';
import Util from 'src/components/util/util';
import RubeLoader from 'src/components/rube/RubeLoader';
import DebugDraw from 'src/components/box2d/debugDraw';

class RubeApp extends BaseApp {

  constructor() {
    super();

    // this.debug = new DebugDraw(this.canvas);
    // this.setDebugDraw(this.debug.getDebugDraw());
    // this.debugDraw.SetFlags(this.debug.e_shapeBit);
    this.debugDraw = DebugDraw.newDebugger(this.canvas);
    this.setDebugDraw(this.debugDraw);
    this.debugDraw.SetFlags(DebugDraw.e_shapeBit);



    this.camera.setViewCenterWorld(new Box2D.b2Vec2(5,10), true);

    //this.camera.setChaseEntity(car);


    var rubeScene =    {"allowSleep":true,"autoClearForces":true,"body":[{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.1748418956995010,0.1748418658971786,-0.2022447735071182,-0.2022447437047958],"y":[-0.1955580562353134,0.1875214725732803,0.1875212043523788,-0.1955580860376358]}}}],"linearVelocity":0,"massData-I":0.03507715463638306,"massData-center":{"x":-0.01370142027735710,"y":-0.004018366336822510},"massData-mass":1.444541215896606,"name":"little stick","position":{"x":-2.323464155197144,"y":12.94079875946045},"type":2},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2247448116540909,0.2247447818517685,-0.2599687576293945,-0.2599687576293945],"y":[-0.2513737678527832,0.2410428673028946,0.2410428375005722,-0.2513737678527832]}}}],"linearVelocity":0,"massData-I":0.09576354175806046,"massData-center":{"x":-0.01761197857558727,"y":-0.005165457259863615},"massData-mass":2.386810302734375,"name":"little stick","position":{"x":-2.962343454360962,"y":12.60832023620605},"type":2},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.1748418956995010,0.1748418658971786,-0.2022447735071182,-0.2022447437047958],"y":[-0.1955580562353134,0.1875214725732803,0.1875212043523788,-0.1955580860376358]}}}],"linearVelocity":0,"massData-I":0.03507715463638306,"massData-center":{"x":-0.01370142027735710,"y":-0.004018366336822510},"massData-mass":1.444541215896606,"name":"little stick","position":{"x":2.706891298294067,"y":12.90388584136963},"type":2},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2247448116540909,0.2247447818517685,-0.2599687576293945,-0.2599687576293945],"y":[-0.2513737678527832,0.2410428673028946,0.2410428375005722,-0.2513737678527832]}}}],"linearVelocity":0,"massData-I":0.09576354175806046,"massData-center":{"x":-0.01761197857558727,"y":-0.005165457259863615},"massData-mass":2.386810302734375,"name":"little stick","position":{"x":2.068011999130249,"y":12.57140731811523},"type":2},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2302255779504776,0.2302255481481552,-0.2663097381591797,-0.2663097381591797],"y":[-0.2575039863586426,0.2469214349985123,0.2469214051961899,-0.2575039863586426]}}}],"linearVelocity":0,"massData-I":0.1054529696702957,"massData-center":{"x":-0.01804208569228649,"y":-0.005291286855936050},"massData-mass":2.504650354385376,"name":"little stick","position":{"x":2.819237709045410,"y":12.03803157806396},"type":2},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2302255779504776,0.2302255481481552,-0.2663097381591797,-0.2663097381591797],"y":[-0.2575039863586426,0.2469214349985123,0.2469214051961899,-0.2575039863586426]}}}],"linearVelocity":0,"massData-I":0.1054529696702957,"massData-center":{"x":-0.01804208569228649,"y":-0.005291286855936050},"massData-mass":2.504650354385376,"name":"little stick","position":{"x":-2.211117744445801,"y":12.07494449615479},"type":2},{"angle":-1.570799946784973,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":2.959076404571533,"y":9.956258773803711},"type":2},{"angle":-0.8050891160964966,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":2.077418565750122,"y":9.541598320007324},"type":2},{"angle":0,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.1000000014901161,"name":"fixture18","polygon":{"vertices":{"x":[1.253818035125732,1.253818035125732,1.053817987442017,1.053817987442017],"y":[-1.0,1.0,1.0,-1.0]}}},{"chain":{"vertices":{"x":[-0.8000000119209290,-0.7682009935379028],"y":[0.9999989867210388,-0.8245300054550171]}},"density":1,"name":"fixture0"},{"density":10.0,"friction":0.1000000014901161,"name":"fixture17","polygon":{"vertices":{"x":[-0.7999999523162842,-0.7999999523162842,-1.0,-1.0],"y":[-1.0,1.0,1.0,-1.0]}}},{"density":10.0,"friction":0.1000000014901161,"name":"fixture16","polygon":{"vertices":{"x":[1.253818035125732,1.253818035125732,-1.0,-1.0],"y":[-1.0,-0.7999999523162842,-0.7999999523162842,-1.0]}}},{"chain":{"vertices":{"x":[1.054140448570251,1.022341370582581],"y":[0.9999990463256836,-0.8245300054550171]}},"density":1,"name":"fixture0"}],"linearVelocity":0,"name":"cup","position":{"x":-2.654895067214966,"y":9.723681449890137},"type":0},{"angle":-1.570799946784973,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":-3.162867784500122,"y":10.39955425262451},"type":2},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.1000000014901161,0.09999998658895493,-0.1000000163912773,-0.1000000014901161],"y":[-1.0,1.267817616462708,1.267817616462708,-1.0]}}}],"linearVelocity":0,"massData-I":2.040346145629883,"massData-center":{"x":-7.235490429025049e-09,"y":0.1339088082313538},"massData-mass":4.535634994506836,"name":"little stick","position":{"x":-2.666081428527832,"y":10.84740066528320},"type":2},{"angle":2.632983684539795,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":2.756426811218262,"y":9.846664428710938},"type":2},{"angle":-1.570799946784973,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":2.958230018615723,"y":10.41763591766357},"type":2},{"angle":0.4232000112533569,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":-2.520286321640015,"y":9.950605392456055},"type":2},{"angle":-1.570799946784973,"angularVelocity":0,"awake":true,"fixture":[{"chain":{"vertices":{"x":[0.8129976987838745,0.8129233717918396],"y":[-12.61962985992432,7.925602912902832]}},"density":1,"friction":0.2000000029802322,"name":"fixture2"},{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"name":"little stick","position":{"x":2.354380607604980,"y":9.201730728149414},"type":0},{"angle":2.903825759887695,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":2.335151195526123,"y":10.06997394561768},"type":2},{"angle":0,"angularVelocity":0,"awake":true,"fixture":[{"density":20.0,"filter-maskBits":2,"friction":0.2000000029802322,"name":"fixture1","polygon":{"vertices":{"x":[-0.1110639572143555,-0.2567489743232727,-0.3195341229438782,-0.3172999620437622,-0.2502849102020264,-0.1352541446685791,0.001321554183959961,0.06728816032409668],"y":[-0.09278871119022369,-0.1048650443553925,-0.1617410182952881,-0.2374484539031982,-0.2988342940807343,-0.2986135482788086,-0.2625808715820312,-0.1420130729675293]}}},{"density":20.0,"filter-maskBits":2,"friction":0.2000000029802322,"name":"fixture1","polygon":{"vertices":{"x":[0.06728816032409668,0.06728816032409668,0.02728986740112305,-0.09244275093078613,-0.1110639572143555,-0.1110639572143555],"y":[-0.1420130729675293,0.03642916679382324,0.1781001091003418,0.2408344745635986,0.1717813014984131,-0.09278871119022369]}}},{"density":20.0,"filter-maskBits":2,"friction":0.2000000029802322,"name":"fixture1","polygon":{"vertices":{"x":[-0.09244275093078613,-0.2231593132019043,-0.2250947356224060,-0.1110639572143555],"y":[0.2408344745635986,0.2194205969572067,0.1728503704071045,0.1717813014984131]}}}],"linearDamping":5.0,"linearVelocity":0,"massData-I":0.1087663471698761,"massData-center":{"x":-0.09155806154012680,"y":-0.06871941685676575},"massData-mass":2.437213659286499,"name":"dynamicbody0","position":{"x":3.588482379913330,"y":10.79668331146240},"type":2},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.1000000014901161,0.09999998658895493,-0.1000000163912773,-0.1000000014901161],"y":[-1.0,1.267817616462708,1.267817616462708,-1.0]}}}],"linearVelocity":0,"massData-I":2.040346145629883,"massData-center":{"x":-7.235490429025049e-09,"y":0.1339088082313538},"massData-mass":4.535634994506836,"name":"little stick","position":{"x":2.189356327056885,"y":10.84740066528320},"type":2},{"angle":-1.975674271583557,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":2.010643959045410,"y":9.913142204284668},"type":2},{"angle":0,"angularVelocity":0,"awake":true,"fixture":[{"chain":{"vertices":{"x":[-0.8000000119209290,-0.7682009935379028],"y":[0.9999989867210388,-0.8245300054550171]}},"density":1,"name":"fixture0"},{"density":10.0,"friction":0.1000000014901161,"name":"fixture17","polygon":{"vertices":{"x":[-0.7999999523162842,-0.7999999523162842,-1.0,-1.0],"y":[-1.0,1.0,1.0,-1.0]}}},{"density":10.0,"friction":0.1000000014901161,"name":"fixture18","polygon":{"vertices":{"x":[1.253818035125732,1.253818035125732,1.053817987442017,1.053817987442017],"y":[-1.0,1.0,1.0,-1.0]}}},{"density":10.0,"friction":0.1000000014901161,"name":"fixture16","polygon":{"vertices":{"x":[1.253818035125732,1.253818035125732,-1.0,-1.0],"y":[-1.0,-0.7999999523162842,-0.7999999523162842,-1.0]}}},{"chain":{"vertices":{"x":[1.054140448570251,1.022341370582581],"y":[0.9999990463256836,-0.8245300054550171]}},"density":1,"name":"fixture0"}],"linearVelocity":0,"name":"cup","position":{"x":2.200542449951172,"y":9.723681449890137},"type":0},{"angle":0.3235100507736206,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":-2.947378396987915,"y":9.782717704772949},"type":2},{"angle":-1.570799946784973,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":-3.162021875381470,"y":9.938177108764648},"type":2},{"angle":-1.115636348724365,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":-2.201057910919189,"y":9.844930648803711},"type":2},{"angle":0,"angularVelocity":0,"awake":true,"fixture":[{"density":20.0,"filter-maskBits":2,"friction":0.2000000029802322,"name":"fixture1","polygon":{"vertices":{"x":[-0.1110639572143555,-0.2567489743232727,-0.3195341229438782,-0.3172999620437622,-0.2502849102020264,-0.1352541446685791,0.001321554183959961,0.06728816032409668],"y":[-0.09278871119022369,-0.1048650443553925,-0.1617410182952881,-0.2374484539031982,-0.2988342940807343,-0.2986135482788086,-0.2625808715820312,-0.1420130729675293]}}},{"density":20.0,"filter-maskBits":2,"friction":0.2000000029802322,"name":"fixture1","polygon":{"vertices":{"x":[0.06728816032409668,0.06728816032409668,0.02728986740112305,-0.09244275093078613,-0.1110639572143555,-0.1110639572143555],"y":[-0.1420130729675293,0.03642916679382324,0.1781001091003418,0.2408344745635986,0.1717813014984131,-0.09278871119022369]}}},{"density":20.0,"filter-maskBits":2,"friction":0.2000000029802322,"name":"fixture1","polygon":{"vertices":{"x":[-0.09244275093078613,-0.2231593132019043,-0.2250947356224060,-0.1110639572143555],"y":[0.2408344745635986,0.2194205969572067,0.1728503704071045,0.1717813014984131]}}}],"linearDamping":5.0,"linearVelocity":0,"massData-I":0.1087663471698761,"massData-center":{"x":-0.09155806154012680,"y":-0.06871941685676575},"massData-mass":2.437213659286499,"name":"dynamicbody0","position":{"x":-1.266955614089966,"y":10.79668331146240},"type":2},{"angle":-2.587733745574951,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"massData-I":0.1621313095092773,"massData-mass":3.104603290557861,"name":"little stick","position":{"x":-2.283493280410767,"y":9.507493019104004},"type":2},{"angle":-1.570799946784973,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2982029914855957,0.2982029914855957,-0.2982029914855957,-0.2982029914855957],"y":[-0.2602759897708893,0.2602759897708893,0.2602759897708893,-0.2602759897708893]}}}],"linearVelocity":0,"name":"little stick","position":{"x":-2.501056909561157,"y":9.201730728149414},"type":0},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2959356307983398,0.2959356307983398,-0.3423185348510742,-0.3423185348510742],"y":[-0.3309998512268066,0.3173968791961670,0.3173968493938446,-0.3309998810291290]}}}],"linearVelocity":0,"massData-I":0.2878946363925934,"massData-center":{"x":-0.02319145202636719,"y":-0.006801500916481018},"massData-mass":4.138419151306152,"name":"little stick","position":{"x":-3.052371501922607,"y":11.63714885711670},"type":2},{"angle":-1.570796370506287,"angularVelocity":0,"awake":true,"fixture":[{"density":10.0,"filter-categoryBits":2,"friction":0.2000000029802322,"name":"fixture20","polygon":{"vertices":{"x":[0.2959356307983398,0.2959356307983398,-0.3423185348510742,-0.3423185348510742],"y":[-0.3309998512268066,0.3173968791961670,0.3173968493938446,-0.3309998810291290]}}}],"linearVelocity":0,"massData-I":0.2878946363925934,"massData-center":{"x":-0.02319145202636719,"y":-0.006801500916481018},"massData-mass":4.138419151306152,"name":"little stick","position":{"x":1.977983951568604,"y":11.60023593902588},"type":2}],"continuousPhysics":true,"gravity":{"x":0,"y":-10.0},"joint":[{"anchorA":{"x":0.06803160160779953,"y":-0.2045420706272125},"anchorB":{"x":-0.2121679782867432,"y":-0.1955609917640686},"bodyA":11,"bodyB":6,"dampingRatio":0.50,"frequency":10.0,"length":0.7430980205535889,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803158670663834,"y":-0.2045419216156006},"anchorB":{"x":-0.2121675908565521,"y":-0.1955612003803253},"bodyA":13,"bodyB":20,"dampingRatio":0.50,"frequency":10.0,"length":0.7430999875068665,"name":"distance","type":"distance"},{"anchorA":{"x":0.06802992522716522,"y":0.1954577565193176},"anchorB":{"x":-0.2121691703796387,"y":0.2044387012720108},"bodyA":13,"bodyB":20,"dampingRatio":0.50,"frequency":10.0,"length":0.7430999875068665,"name":"distance","type":"distance"},{"anchorA":{"x":-0.229980468750,"y":-8.325270073328284e-07},"anchorB":{"x":0.2299799770116806,"y":-2.294865879548524e-07},"bodyA":25,"bodyB":24,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":-0.229980468750,"y":-8.325270073328284e-07},"anchorB":{"x":0.229980468750,"y":1.172712913444229e-07},"bodyA":6,"bodyB":12,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":-0.229980468750,"y":-8.325270073328284e-07},"anchorB":{"x":0.229980468750,"y":1.172712913444229e-07},"bodyA":21,"bodyB":9,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06803162395954132,"y":-0.2045421451330185},"anchorB":{"x":-0.2121675759553909,"y":-0.1955608874559402},"bodyA":15,"bodyB":11,"dampingRatio":0.50,"frequency":10.0,"length":0.7430999875068665,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803198158740997,"y":-0.2045418471097946},"anchorB":{"x":-0.2121673822402954,"y":-0.1955613940954208},"bodyA":18,"bodyB":15,"dampingRatio":0.50,"frequency":10.0,"length":0.7431839704513550,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803125143051147,"y":-0.2045419663190842},"anchorB":{"x":-0.2121677398681641,"y":-0.1955613195896149},"bodyA":22,"bodyB":13,"dampingRatio":0.50,"frequency":10.0,"length":0.7431839704513550,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803109496831894,"y":-0.2045419067144394},"anchorB":{"x":-0.2121679037809372,"y":-0.1955613493919373},"bodyA":25,"bodyB":24,"dampingRatio":0.50,"frequency":10.0,"length":0.7442610263824463,"name":"distance","type":"distance"},{"anchorA":{"x":0.06802964955568314,"y":0.1954579502344131},"anchorB":{"x":-0.2121688425540924,"y":0.2044391781091690},"bodyA":25,"bodyB":24,"dampingRatio":0.50,"frequency":10.0,"length":0.7442610263824463,"name":"distance","type":"distance"},{"anchorA":{"x":-0.2299800664186478,"y":-9.787024737306638e-07},"anchorB":{"x":0.2299799323081970,"y":1.053900291481114e-07},"bodyA":18,"bodyB":15,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":-1.192092895507812e-07,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06803053617477417,"y":0.1954581439495087},"anchorB":{"x":-0.2121690958738327,"y":0.2044388800859451},"bodyA":18,"bodyB":15,"dampingRatio":0.50,"frequency":10.0,"length":0.7431839704513550,"name":"distance","type":"distance"},{"anchorA":{"x":-1.005409955978394,"y":1.037619590759277},"anchorB":{"x":0.1001644581556320,"y":-0.9929420948028564},"bodyA":8,"bodyB":10,"collideConnected":true,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":-0.1500000059604645,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06803034245967865,"y":0.1954583525657654},"anchorB":{"x":-0.2121694087982178,"y":0.2044391930103302},"bodyA":24,"bodyB":22,"dampingRatio":0.50,"frequency":10.0,"length":0.7439270019531250,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803169101476669,"y":-0.2045416980981827},"anchorB":{"x":-0.2121679782867432,"y":-0.1955609917640686},"bodyA":20,"bodyB":21,"dampingRatio":0.50,"frequency":10.0,"length":0.7430980205535889,"name":"distance","type":"distance"},{"anchorA":{"x":-0.229980468750,"y":-8.325270073328284e-07},"anchorB":{"x":0.2299797534942627,"y":1.436523007214419e-07},"bodyA":14,"bodyB":7,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06803013384342194,"y":0.1954581588506699},"anchorB":{"x":-0.2121694386005402,"y":0.2044391036033630},"bodyA":11,"bodyB":6,"dampingRatio":0.50,"frequency":10.0,"length":0.7430980205535889,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803109496831894,"y":-0.2045419067144394},"anchorB":{"x":-0.2121674865484238,"y":-0.1955610215663910},"bodyA":14,"bodyB":7,"dampingRatio":0.50,"frequency":10.0,"length":0.7442610263824463,"name":"distance","type":"distance"},{"anchorA":{"x":-0.2299802452325821,"y":-6.592747467948357e-07},"anchorB":{"x":0.2299803942441940,"y":2.117035506898901e-07},"bodyA":7,"bodyB":18,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06802964955568314,"y":0.1954579502344131},"anchorB":{"x":-0.2121689021587372,"y":0.2044389247894287},"bodyA":14,"bodyB":7,"dampingRatio":0.50,"frequency":10.0,"length":0.7442610263824463,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803014874458313,"y":0.1954581737518311},"anchorB":{"x":-0.2121692448854446,"y":0.2044392079114914},"bodyA":15,"bodyB":11,"dampingRatio":0.50,"frequency":10.0,"length":0.7430999875068665,"name":"distance","type":"distance"},{"anchorA":{"x":-0.2299801260232925,"y":-8.154047463904135e-07},"anchorB":{"x":0.2299800515174866,"y":-2.338624085496122e-07},"bodyA":13,"bodyB":20,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06803009659051895,"y":0.1954582035541534},"anchorB":{"x":-0.2121694386005402,"y":0.2044391036033630},"bodyA":20,"bodyB":21,"dampingRatio":0.50,"frequency":10.0,"length":0.7430980205535889,"name":"distance","type":"distance"},{"anchorA":{"x":0.06802964955568314,"y":0.1954579502344131},"anchorB":{"x":-0.2121694386005402,"y":0.2044391036033630},"bodyA":6,"bodyB":12,"dampingRatio":0.50,"frequency":10.0,"length":0.7430980205535889,"name":"distance","type":"distance"},{"anchorA":{"x":-1.005409955978394,"y":1.037619590759277},"anchorB":{"x":0.1001644581556320,"y":-0.9929419755935669},"bodyA":19,"bodyB":17,"collideConnected":true,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":-0.1500000059604645,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06802964955568314,"y":0.1954579502344131},"anchorB":{"x":-0.2121694386005402,"y":0.2044391036033630},"bodyA":21,"bodyB":9,"dampingRatio":0.50,"frequency":10.0,"length":0.7430980205535889,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803109496831894,"y":-0.2045419067144394},"anchorB":{"x":-0.2121679782867432,"y":-0.1955609917640686},"bodyA":21,"bodyB":9,"dampingRatio":0.50,"frequency":10.0,"length":0.7430980205535889,"name":"distance","type":"distance"},{"anchorA":{"x":-0.2299800813198090,"y":-8.324180953422911e-07},"anchorB":{"x":0.2299800068140030,"y":1.047848741109192e-07},"bodyA":24,"bodyB":22,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06803109496831894,"y":-0.2045419067144394},"anchorB":{"x":-0.2121679782867432,"y":-0.1955609917640686},"bodyA":6,"bodyB":12,"dampingRatio":0.50,"frequency":10.0,"length":0.7430980205535889,"name":"distance","type":"distance"},{"anchorA":{"x":1.164659976959229,"y":0.8405723571777344},"anchorB":{"x":-0.2232780456542969,"y":-0.2324304580688477},"bodyA":19,"bodyB":16,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"joint0","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06803011894226074,"y":0.1954578906297684},"anchorB":{"x":-0.2121692895889282,"y":0.2044387459754944},"bodyA":7,"bodyB":18,"dampingRatio":0.50,"frequency":10.0,"length":0.7439270019531250,"name":"distance","type":"distance"},{"anchorA":{"x":-0.2299799472093582,"y":-1.088389467440720e-06},"anchorB":{"x":0.2299801260232925,"y":-1.442769814730127e-07},"bodyA":15,"bodyB":11,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":-0.2299799025058746,"y":-8.219253118113556e-07},"anchorB":{"x":0.229980468750,"y":1.172712913444229e-07},"bodyA":20,"bodyB":21,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":0.06803024560213089,"y":0.1954578906297684},"anchorB":{"x":-0.2121690064668655,"y":0.2044392377138138},"bodyA":22,"bodyB":13,"dampingRatio":0.50,"frequency":10.0,"length":0.7431839704513550,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803153455257416,"y":-0.2045420557260513},"anchorB":{"x":-0.2121678888797760,"y":-0.1955611407756805},"bodyA":7,"bodyB":18,"dampingRatio":0.50,"frequency":10.0,"length":0.7439270019531250,"name":"distance","type":"distance"},{"anchorA":{"x":0.06803148239850998,"y":-0.2045422941446304},"anchorB":{"x":-0.2121674865484238,"y":-0.1955609619617462},"bodyA":24,"bodyB":22,"dampingRatio":0.50,"frequency":10.0,"length":0.7439270019531250,"name":"distance","type":"distance"},{"anchorA":{"x":-0.2299803197383881,"y":-7.472209517800366e-07},"anchorB":{"x":0.2299799472093582,"y":-1.520496368812019e-07},"bodyA":22,"bodyB":13,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":0,"type":"revolute","upperLimit":0},{"anchorA":{"x":-0.2299800813198090,"y":-9.208857818521210e-07},"anchorB":{"x":0.229980468750,"y":1.172712913444229e-07},"bodyA":11,"bodyB":6,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"revolute","refAngle":1.192092895507812e-07,"type":"revolute","upperLimit":0},{"anchorA":{"x":1.164659976959229,"y":0.8405723571777344},"anchorB":{"x":-0.2232780456542969,"y":-0.2324304580688477},"bodyA":8,"bodyB":23,"enableLimit":false,"enableMotor":false,"jointSpeed":0,"lowerLimit":0,"maxMotorTorque":0,"motorSpeed":0,"name":"joint0","refAngle":0,"type":"revolute","upperLimit":0}],"positionIterations":3,"stepsPerSecond":60.0,"subStepping":false,"velocityIterations":8,"warmStarting":true};
    

    this.rubeLoader = new RubeLoader();
    this.rubeLoader.loadSceneIntoWorld(rubeScene, this.world);
  }

  draw(ctx){



    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, 4, 4);
    //
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 1, 1);
  }

}

export default RubeApp;
