describe("CloudTravel", function() {
  var cloudTravel;

  beforeEach(function() {
    cloudTravel = new CloudTravel();
  });

  it(`Test Case 1
    Latitude--->{0, 0, 70}
    Longitude--->{90, 0, 45}
    canTravel-->{"1 2", "0 2", "0 1"}
    origin-->0
    destination-->1`, function() {

    let latitude = [0,0,70];
    let longitude = [90,0,45];
    let canTravel = ["1 2", "0 2", "0 1"];
    let origin = 0;
    let destination = 1;
    expect(cloudTravel.shortestCourierTrip(latitude, longitude, canTravel, origin, destination)).toEqual(6283.185307179586);

   });

   it(`Test Case 2
    Latitude --> {0, 0, 70}
    Longitude--> {90, 0, 45}
    canTravel --> {"2", "0 2", "0 1"}
    origin-->  0
    destination-->  1`, function() {

     let latitude = [0,0,70];
     let longitude = [90,0,45];
     let canTravel = ["2", "0 2", "0 1"];
     let origin = 0;
     let destination = 1;
     expect(cloudTravel.shortestCourierTrip(latitude, longitude, canTravel, origin, destination)).toEqual(10612.237799994255);

    });



});
