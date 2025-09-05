import { useSelector } from "react-redux";
import { selectWorkItems } from "../../store/workSlice";
import "./WorkYourWay.css";

const WorkYourWay = () => {
  const items = useSelector(selectWorkItems);

  return (
    <section className="work-section py-5">
      <div className="container">
        <h1 className="section-title text-center mb-5">Work your way</h1>

        {/* Cards grid */}
        <div className="row g-4">
          {items.map((item) =>
            item.large ? (
              <div key={item.id} className="col-12">
                <div className="card card--lg overflow-hidden h-100">
                  <div className="row g-0 align-items-center">
                    {/* Text side */}
                    <div className="col-12 col-lg-6 p-4">
                      <h1 className="fw-bold mb-3">{item.title}</h1>
                      <h3 className="mb-4 fw-light">{item.desc}</h3>
                      <button className="btn btn-outline-warning">
                        <i className="fas fa-crown me-2"></i>
                        GET PREMIUM
                      </button>
                    </div>
                    {/* Image side */}
                    <div className="col-12 col-lg-6 card-lg-img">
                      <img
                        src={item.image}
                        alt={item.title}
                        className=" img-fluid w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div key={item.id} className="col-12 col-sm-6 col-lg-4">
                <a href="https://www.ilovepdf.com/" className="text-decoration-none">
                  <div className={`card trans h-100 p-0 ${item.color}`}>
                    <img src={item.image} alt={item.title} className="card-img-top img-fluid" />
                    <div className="card-body">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                      <i className="fas fa-up-right-from-square fa-lg"></i>
                    </div>
                  </div>
                </a>
              </div>
            )
          )}
        </div>

        {/* Trusted section */}
        <div className="text-center mt-5 pt-5">
          <h1 className="fw-bold mb-4 px-3" style={{ fontSize: "2.5rem" }}>
            Your trusted online image editor, loved by users worldwide
          </h1>
          <h3 className="fw-light px-3 mb-5">
            iLoveIMG is your simple solution for editing images online. Access
            all the tools you need to enhance your images easily, straight from
            the web, with 100% security.
          </h3>

          <div className="d-flex justify-content-center gap-5 flex-wrap">
            <a href="https://www.iloveimg.com/img/trust/iso.svg">
              <img
                src="https://www.iloveimg.com/img/trust/iso.svg"
                alt="iso"
                width={100}
                className="img-fluid"
              />
            </a>
            <a href="https://www.iloveimg.com/img/trust/ssl.svg">
              <img
                src="https://www.iloveimg.com/img/trust/ssl.svg"
                alt="ssl"
                width={100}
                className="img-fluid"
              />
            </a>
          </div>
        </div>
      </div>
    </section >
  );
};

export default WorkYourWay;
