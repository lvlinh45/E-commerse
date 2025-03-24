import SeekingProduct from "../../components/sidebar/seekingProduct";
import SidebarSeeking from "../../components/sidebar/sidebarSeeking";

const SeekingPage = () => {
  return (
    <div className="seekingPage-container">
      <SidebarSeeking></SidebarSeeking>
      <SeekingProduct></SeekingProduct>
    </div>
  );
};

export default SeekingPage;
