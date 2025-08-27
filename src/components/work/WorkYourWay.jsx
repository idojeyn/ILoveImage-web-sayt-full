import { useSelector } from "react-redux";
import { selectWorkItems } from "../../store/workSlice";
import "./WorkYourWay.css";

const WorkYourWay = () => {
    const items = useSelector(selectWorkItems);

    return (
        <section className="work-section">
            <div className="container">
                <h1 className="section-title">Work your way</h1>
                <div className="cards">
                    {items.map((item) => item.large ? (
                        <div key={item.id} className="card card--lg overflow-hidden mt-5 pt-3">
                            <div className="card-body">
                                <h1 className="fw-bold mb-2">{item.title}</h1>
                                <h3 className="mb-3 " style={{ width: '60%', fontWeight: '300' }}> {item.desc}</h3>
                                <div className="d-flex gap-2 flex-wrap">
                                    <button className="btn btn-outline-warning"><i className="fas fa-crown"></i>GET PREMIUM</button>
                                </div>
                                <img src={item.image} alt={item.title} className="card-lg-img" />
                            </div>
                        </div>
                    ) : (
                        <div key={item.id} className={`card trans ${item.color}`}>
                            <a href="https://www.ilovepdf.com/">
                                <img src={item.image} alt={item.title} className="card-img-top" />
                                <div className="card-body">
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                    <i className="fas fa-up-right-from-square fa-2x"></i>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="container p-5">
                    <h1 style={{ textAlign: 'center', fontSize: '45px', padding: "150px 30px 0" }}>Your trusted online image editor, loved by users worldwide</h1>
                    <h3 style={{ textAlign: 'center', fontWeight: '300', padding: '0 30px', margin: '40px' }}>iLoveIMG is your simple solution for editing images online. Access all the tools you need to enhance your images easily, straight from the web, with 100% security.</h3>
                    <div className="text-center " style={{ width: '400px', margin: '0 auto', padding: '50px' }} >
                        <a href="https://www.iloveimg.com/img/trust/iso.svg"><img width={100} style={{ float: 'left' }} src="https://www.iloveimg.com/img/trust/iso.svg" alt="iso" /></a>
                        <a href="https://www.iloveimg.com/img/trust/ssl.svg"><img width={100} style={{ float: 'right' }} src="https://www.iloveimg.com/img/trust/ssl.svg" alt="ssl" /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkYourWay;
