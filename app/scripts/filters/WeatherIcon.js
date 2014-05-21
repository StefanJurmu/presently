'use strict';

app.filter('weatherIcon', function() {
  return function(input) {
    switch(input) {
	case 'clear':
	case 'sunny':
	    return 'B'
	    break;
	case 'partlycloudy': 
	case 'partysunny': 
	case 'mostlysunny':
	case 'mostlycloudy':
	    return 'H'
	    break;
	case 'chancerain':
		return 'Q'
		break;
	case 'chanceflurries':
	case 'chancesnow':
		return 'U'
		break;
	case 'chancesleet':
	case 'sleet':
		return 'X'
		break;
	case 'chancetstorms':
		return 'O'
		break;
	case 'cloudy':
		return 'N'
		break;
	case 'flurries':
		return 'W'
		break;
	case 'fog':
	case'hazy':
		return 'M'
		break;
	case 'rain':
		return 'R'
		break;
	case 'snow':
		return 'G'
		break;
	case 'tstorms':
		return 'P'
		break;
	default:
	    return '';
	}
  };
});