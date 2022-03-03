var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");


describe("Test pokemon API",function(){

  // #1 should return Pokemon object

  it("should return pokemon object",function(done){

    server
    .get("/pokemon/pikachu")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.should.be.an.instanceOf(Object);
      res.body.name.should.equal('pikachu');
      res.body.should.have.property('name');
      res.body.should.have.property('sprite');
      res.body.should.have.property('description');
      done();
    });
  });

});