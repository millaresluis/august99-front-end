import React, {useState, useEffect} from 'react'
import axios from "axios";
import LazyLoad from 'react-lazy-load';
import Loading from './Loading';

const API_URL = "https://api.spacexdata.com/v4/launches/";

const List = () => {
    const [loading, setLoading] = useState(true);
    const [launches, setLaunches] = useState();

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            await axios.get(API_URL)
            .then((response) => {
                setLaunches(response.data);
            })
            .catch ((error) => {
                console.error(error.message);
            })
            setLoading(false);
        }

        fetchData();
    }, [])

    if (!launches) return null;
  return (
    <div style={{  }}>
        {loading && <Loading/>}
        {!loading && (
  
        <div>
            <div style={{ backgroundColor: '#F2F1F1', margin:'0 50px', fontFamily: 'Montserrat' }}>
                <div  >
                    <h3 style={{ paddingTop: 20, fontSize: 30 }} >
                        SpaceX Launches
                    </h3>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', margin: '30px 200px', border: '1px solid #D6D6D6', borderRadius: 10 , padding: 50  }}>
                    {launches.map((launch) => (
                        <LazyLoad key={launch.id} >
                            <div style={{ display: 'flex', flexDirection: 'row'  }}> 
                                <div style={{ margin: '0 30px 40px 0'  }}>
                                    <img style={{ width: '120px' }} src={launch.links.patch.small} alt="" />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ fontSize: 20 }}>
                                        {launch.flight_number}: {launch.name} ({launch.date_local.slice(0,4)})
                                    </h4>
                                    <p style={{ fontSize: 16, color: '#8E8D8D' }}>
                                        <b style={{ color: '#727171' }}>Details:</b> {launch.details ? launch.details + '.' : 'Information not available.' }
                                    </p>
                                </div>
                            </div>
                        </LazyLoad>
                    ))}
                </div>
            </div>
        </div>  
        )}
    </div>
  )
}

export default List