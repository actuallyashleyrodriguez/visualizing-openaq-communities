import React from 'react';
class Communities extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              error: null,
              isLoaded: false,
              communityInfo: {
                name:[],
                country: [],
                parameters: [],
                latitude: [],
                longitude: []
            }
            };
    }

    componentDidMount() {
        fetch("https://docs.openaq.org/v2/locations?limit=100&page=1&offset=0&sort=desc&unit=%C2%B5g%2Fm%C2%B3&radius=1000&order_by=lastUpdated&dumpRaw=false")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                communityInfo:  { 
                    name: result.name,
                    country: result.country,
                    paramters: result.parameters,
                    latitude: result.coordinates.latitude,
                    longitude: result.coordinates.longitude,
                }
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
      render() {
        const { error, isLoaded, communityInfo } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <ul>
              {communityInfo.map(item => (
                <li key={item.name}>
                  {item.name} {item.country}
                </li>
              ))}
            </ul>
          );
        }
      }
}

export default Communities