import { Tab, Tabs, Row, Col, Card } from "react-bootstrap";
import Text from "../Universal/text";
import { trendingTab } from "../../constants/urlTrending";
import Button from "../Universal/Button";
import { IconAngleRight } from "../../assets/icons/Icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Trending = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("homePage");

  return (
    <div className="trending-container mt-5 ">
      <Text
        text={t("TRENDING_NEWS")}
        classname="mb-3 "
        textCenter="justify-content-center"
      ></Text>
      <Tabs
        defaultActiveKey={trendingTab[0].name.toLowerCase()}
        id="uncontrolled-tab"
        className="mb-3"
      >
        {trendingTab.map((tab) => (
          <Tab eventKey={tab.name.toLowerCase()} title={tab.name} key={tab.id}>
            <Row className="trending-row">
              {tab.trendingData.map((item) => (
                <Col
                  key={item.id}
                  xs={12}
                  md={6}
                  lg={3}
                  className="trending-item"
                >
                  <Card className="trending-card">
                    <Card className="card-wrapper">
                      <Card.Img variant="top" src={item.url} />
                    </Card>
                    <Card.Body>
                      <Card.Title className="trending-title">
                        {item.name}
                      </Card.Title>
                      <a
                        href="#"
                        className="read-more d-flex align-items-center gap-1 "
                      >
                        <span onClick={() => navigate("/collection/all")}>
                          {" "}
                          {t("READ_MORE")}
                        </span>
                        <IconAngleRight></IconAngleRight>
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tab>
        ))}
      </Tabs>
      <div className="d-flex justify-content-center">
        <Button
          text={t("SHOW_ALL")}
          onClick={() => navigate("/collection/all")}
        />
      </div>
    </div>
  );
};

export default Trending;
