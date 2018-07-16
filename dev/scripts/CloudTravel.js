const  RADIUS  = 4000;//miles
class CloudTravel {
  constructor(latitude, longitude, canTravel) {
    this.airPortList = {};
    this.path = [];
  }

   toRadians(angle) {
      return angle * (Math.PI / 180);
   }
	isLngBtnRange(lng) {
  			return lng <= 179 && lng >= -179;
		}

		isLatBtnRange(lat) {
		  	return lat <= 89 && lat >= -89;
		}

    isTravelValid(airPort, latCount) {
    	return airPort >= 0 && airPort <= latCount - 1;
    }

    _findPortPath(port, visited, destination, path) {

    	if(!visited[port]) {
        visited[port] = true;
        const portNeighbors = this.airPortList[port];
        path.push(port)

        for (let currentPort of portNeighbors) {
          if(currentPort == destination) {
          	 path.push(destination);
            return true;
          } else if(!visited[currentPort] && this._findPortPath(currentPort,visited, destination, path)){
          	return true;
        	}
    	}

    }
  	return false;
  }

   shortestTrip(origin, destination) {
   		const airPortNodes = Object.keys(this.airPortList);
  		const visited = {};
      for (let port of airPortNodes) {
         this.path = [];
      	if (port == origin && this._findPortPath(port, visited, destination, this.path)) {
      	   return true;
      	 }
         return false;
      }
   }

  shortestCourierTrip(latitude, lngitude, canTravel, origin, destination) {

      const latCount =  Array.isArray(latitude) && latitude.length;
      const lngCount = Array.isArray(lngitude) && lngitude.length;
      const canTravelCount = Array.isArray(canTravel) && canTravel.length;

      if( latCount == lngCount && lngCount == canTravelCount && latCount >= 1 && latCount <= 120 ) {
          if ( !Number.isInteger(origin ) || !Number.isInteger(destination)) {
  	           return -1;
          } else if( !this.isTravelValid(origin, latCount) || !this.isTravelValid(destination, latCount)) {
 		           return -1;
          }

          if(origin == destination) {
 		           return parseFloat(0).toFixed(1);
          }

          if( !latitude.every(this.isLatBtnRange) || !lngitude.every(this.isLngBtnRange)) {
 		           return -1;
          }

          for (const [index, data] of canTravel.entries()) {
              this.airPortList[index] = [];
              this.airPortList[index].push(...data.split(" "))
            }

	          if(!this.shortestTrip(origin, destination)) {
  	            return -1;
            }

            const airPort = {};
            let  lat1, lat2, lng1,lng2 , d=0;
            for (let i = 0, len = this.path.length; i < len - 1; i++) {

                lat1 = this.toRadians(latitude[this.path[i]]);
                lng1 = this.toRadians(lngitude[this.path[i]]);
                lat2 = this.toRadians(latitude[this.path[i+1]]);
                lng2 = this.toRadians(lngitude[this.path[i+1]]);

                d = d + RADIUS * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2)*Math.cos(lng2 - lng1));
            }

            return d;
        } else {
          return -1;
        }
      }
}

let latitude = [0,0,70];
let longitude = [90,0,45];
let canTravel = ["2", "0 2", "0 1"];
let origin = 0;
let destination = 1;

let cloudTravel = new CloudTravel();

 console.log("shortestTrip--------", cloudTravel.shortestCourierTrip(latitude, longitude, canTravel, origin, destination));
