import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OffersPage.css";

const OffersPage = () => {
  const url = "http://localhost:4000";
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH OFFERS ================= */
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${url}/api/offers`);

      if (res.data?.success && Array.isArray(res.data.offers)) {
        setOffers(res.data.offers);
      } else {
        setOffers([]);
      }
    } catch (error) {
      console.error("Fetch offers error:", error);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="offers-page">
      <h1 className="offers-title">🔥 Available Offers</h1>

      {loading ? (
        <p className="offers-loading">Loading offers...</p>
      ) : offers.length === 0 ? (
        <p className="offers-empty">No offers available right now</p>
      ) : (
        <div className="offers-grid">
          {offers.map((offer) => (
            <div className="offer-card" key={offer._id}>
              <div className="offer-badge">OFFER</div>

              <h2 className="offer-code">{offer.code}</h2>

              <p className="offer-discount">
                {offer.discountType === "percentage"
                  ? `${offer.discountValue}% OFF`
                  : `₹${offer.discountValue} OFF`}
              </p>

              <p className="offer-min">
                Min Order: ₹{offer.minAmount}
              </p>

              <p className="offer-expiry">
                Valid till{" "}
                {new Date(offer.expiryDate).toLocaleDateString()}
              </p>

              <button
                className="offer-copy"
                onClick={() => {
                  navigator.clipboard.writeText(offer.code);
                  alert("Offer code copied!");
                }}
              >
                Copy Code
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersPage;