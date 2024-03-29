import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // rajout d'une fonction pour filtrer par type d'evenement
  const filteredEventsType = ((!type
    ? data?.events
    : data?.events) || []).filter((event) => 
      type === null || event.type === type
  );

  // utilisation de slice pour afficher les PER_PAGE resultats
  const startIdx = (currentPage - 1) * PER_PAGE;
  const endIdx = startIdx + PER_PAGE;
  const filteredEvents = filteredEventsType.slice(startIdx, endIdx);
  
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  
  const pageNumber = Math.ceil((filteredEventsType?.length || 0) / PER_PAGE); // ceil au lieu de floor pour arrondir entier au dessus
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => changeType(value)}

          />
          <div id="events" data-testid="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
