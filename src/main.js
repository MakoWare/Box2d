import Box2D from 'src/components/box2d/box2d';
import canvas from 'src/components/canvas/canvas';
import InputController from "src/components/input/inputController";
import testbed from 'src/libs/embox2d-html5canvas-testbed';



// function init() {
//
//   // canvas = document.getElementById("canvas");
//   context = canvas.getContext( '2d' );
//
//   canvasOffset.x = canvas.width/2;
//   canvasOffset.y = canvas.height/2;
//
//   canvas.addEventListener('mousemove', function(evt) {
//     onMouseMove(canvas,evt);
//   }, false);
//
//   canvas.addEventListener('mousedown', function(evt) {
//     onMouseDown(canvas,evt);
//   }, false);
//
//   canvas.addEventListener('mouseup', function(evt) {
//     onMouseUp(canvas,evt);
//   }, false);
//
//   canvas.addEventListener('mouseout', function(evt) {
//     onMouseOut(canvas,evt);
//   }, false);
//
//   canvas.addEventListener('keydown', function(evt) {
//     onKeyDown(canvas,evt);
//   }, false);
//
//   canvas.addEventListener('keyup', function(evt) {
//     onKeyUp(canvas,evt);
//   }, false);
//
//   myDebugDraw = getCanvasDebugDraw();
//   myDebugDraw.SetFlags(e_shapeBit);
//
//   myQueryCallback = new Box2D.JSQueryCallback();
//
//   myQueryCallback.ReportFixture = function(fixturePtr) {
//     var fixture = Box2D.wrapPointer( fixturePtr, b2Fixture );
//     if ( fixture.GetBody().GetType() != Box2D.b2_dynamicBody ) //mouse cannot drag static bodies around
//       return true;
//     if ( ! fixture.TestPoint( this.m_point ) )
//       return true;
//     this.m_fixture = fixture;
//     return false;
//   };
// }
//
// function changeTest() {
//   resetScene();
//   if ( currentTest && currentTest.setNiceViewCenter )
//     currentTest.setNiceViewCenter();
//   updateDebugDrawCheckboxesFromWorld();
//   draw();
// }
//
// function animate() {
//   if ( run )
//     requestAnimFrame( animate );
//   step();
// }


testbed.init();
testbed.changeTest();
testbed.animate();
