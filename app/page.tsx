"use client";

import { useMemo, useState } from "react";

const performanceAreas = [
  {
    id: "meta",
    number: "01",
    label: "Meta Ads",
    title: "Create demand, test the message, scale what converts.",
    copy: "Campaign structure is only the shell. The real work is matching the offer, creative angle and audience signal — then turning the result into a repeatable acquisition system.",
    bullets: [
      "Campaign architecture and testing roadmap",
      "Creative hypotheses, briefs and performance feedback",
      "Retargeting, budget control and scaling",
    ],
    signal: "CPA, creative fatigue, post-click conversion",
    color: "violet",
  },
  {
    id: "google",
    number: "02",
    label: "Google Ads",
    title: "Capture demand that already exists.",
    copy: "Search and Shopping should make profitable products easier to find — without letting broad traffic, weak queries or an unmanaged feed consume the budget.",
    bullets: [
      "Search, Shopping and Performance Max structure",
      "Product-feed priorities and query control",
      "Category-level optimisation and scaling",
    ],
    signal: "Search intent, category ROAS, marginal CPA",
    color: "lime",
  },
  {
    id: "email",
    number: "03",
    label: "Email Marketing",
    title: "Make acquisition more valuable after the first order.",
    copy: "Email connects paid acquisition to repeat revenue. The objective is not to send more campaigns — it is to build the right automated conversations around customer intent.",
    bullets: [
      "Welcome and abandoned-checkout flows",
      "Post-purchase, replenishment and reactivation",
      "Segmentation and repeat-purchase communication",
    ],
    signal: "Recovered revenue, repeat rate, flow revenue",
    color: "coral",
  },
  {
    id: "reporting",
    number: "04",
    label: "Performance Reporting",
    title: "Turn platform data into a decision.",
    copy: "A useful report explains what the business invested, what it received and what should change next. It should not require the client to decode an advertising dashboard.",
    bullets: [
      "Revenue, spend, CAC and blended efficiency",
      "Funnel shifts and commercial context",
      "Clear next actions and budget recommendations",
    ],
    signal: "What moved, why it moved, what happens next",
    color: "blue",
  },
  {
    id: "profit",
    number: "05",
    label: "Profitability Planning",
    title: "Know the acceptable CPA before increasing spend.",
    copy: "The target is set from the economics of the offer — not from an arbitrary industry benchmark. This creates a clear line between growth and expensive activity.",
    bullets: [
      "Break-even ROAS and maximum CPA",
      "Margin, AOV and LTV scenarios",
      "Budget and revenue planning before scale",
    ],
    signal: "Contribution, break-even point, scaling room",
    color: "amber",
  },
];

const cases = [
  {
    id: "google-retail",
    index: "01",
    channel: "Google Ads · Retail e-commerce",
    title: "UAH 12.4M in tracked revenue from a structured Google Ads account",
    intro:
      "Growth came from a clearer campaign architecture, stronger product-feed management and category-level optimisation — allowing the account to scale without losing control of acquisition cost.",
    metrics: [
      ["UAH 12.4M", "tracked revenue"],
      ["2,960", "sales"],
      ["UAH 1.42M", "ad spend"],
      ["8.72×", "ROAS"],
      ["≈ UAH 480", "cost per sale"],
    ],
    challenge:
      "A large product catalogue needed structure that reflected demand and commercial priority — not one undifferentiated budget.",
    strategy:
      "Campaigns were divided by product category and intent, the feed was tightened, search demand was cleaned up and budget moved toward the segments with the strongest marginal return.",
    impact:
      "The account generated 2,960 purchases at an average acquisition cost of approximately UAH 480 while maintaining an 8.72× return.",
    evidence:
      "Google Ads account snapshot supplied for this case. The presentation crop removes the reporting dates and keeps the core account metrics visible.",
    proof: "google",
  },
  {
    id: "ltv-uae",
    index: "02",
    channel: "Meta Ads + Retention · UAE e-commerce",
    title: "The 40% of advertising efficiency that first-order reports miss",
    intro:
      "Advertising performance does not end at acquisition. This case measured what happened after the first purchase — and showed how retention changed the commercial picture.",
    metrics: [
      ["AED 10,228", "ad spend"],
      ["AED 130.7K", "total revenue"],
      ["148", "orders"],
      ["AED 884", "average order"],
      ["28.57%", "returning customer rate"],
    ],
    challenge:
      "If the brand evaluated paid media only through first purchases, a meaningful part of the value created by acquisition disappeared from the report.",
    strategy:
      "Retargeting, email communication and repeat-purchase journeys were connected to the acquisition strategy, then analysed alongside new-customer revenue.",
    impact:
      "New-customer revenue produced a 9.2× return. When repeat revenue was included, total return reached 12.8× — almost 40% more efficiency beyond the first order.",
    evidence:
      "The customer-type split confirms that 28.57% of the 148 orders came from returning customers.",
    proof: "ltv",
  },
  {
    id: "shopify-global",
    index: "03",
    channel: "Meta Ads · International Shopify brand",
    title: "$42.4K in four months through a creative-led acquisition system",
    intro:
      "The account entered the strongest retail season with the content, testing rhythm and market structure prepared before demand peaked.",
    metrics: [
      ["$42,397", "store revenue"],
      ["312", "orders"],
      ["$13,192", "ad spend"],
      ["$44.39", "cost per purchase"],
      ["2.18", "ROMI"],
    ],
    challenge:
      "The brand needed to turn a short seasonal window across five markets into controlled sales — without relying on one creative or one audience.",
    strategy:
      "UGC, stop-motion and video concepts were tested across the US, Canada, the UK, Australia and Germany. Winning formats received budget while weak combinations were removed quickly.",
    impact:
      "The store generated $42.4K in revenue and 312 orders, with creative iteration becoming the main engine of scale.",
    evidence:
      "The supplied Shopify snapshot confirms $42,397.08 in total sales and 312 completed orders.",
    proof: "global",
  },
  {
    id: "product-launch",
    index: "04",
    channel: "Meta Ads · New product launch",
    title: "A profitable first-month signal for a product launched from zero",
    intro:
      "The goal was not to force scale immediately. It was to validate demand, understand the acquisition economics and identify a combination worth building on.",
    metrics: [
      ["$8,878", "first-month revenue"],
      ["$142", "average order"],
      ["$36.10", "cost per purchase"],
      ["335.53%", "ROI"],
      ["$129", "product price"],
    ],
    challenge:
      "With no previous performance history, the launch required a test that could answer whether the product, message and price worked together.",
    strategy:
      "Creative angles, audiences and purchase behaviour were tested in controlled stages. Decisions were based on contribution and repeatable purchase signals rather than cheap clicks.",
    impact:
      "The first month generated $8.9K in revenue at a $36.10 acquisition cost and created a clear foundation for the next scaling decision.",
    evidence:
      "Launch reporting confirms $8,877.95 in store revenue and a calculated ROI of 335.53%.",
    proof: "launch",
  },
  {
    id: "pet-uae",
    index: "05",
    channel: "Meta Ads · Pet e-commerce · UAE",
    title: "Revenue up 46% while order volume grew 77%",
    intro:
      "The account combined focused product campaigns with a sharper creative and offer rhythm — increasing Shopify revenue and the number of completed orders.",
    metrics: [
      ["AED 35,221", "Shopify revenue"],
      ["62", "store orders"],
      ["+46%", "revenue growth"],
      ["+77%", "order growth"],
      ["AED 51.46", "Meta CPA"],
    ],
    challenge:
      "A niche catalogue needed product-level prioritisation and fresh creative signals without losing control of acquisition costs.",
    strategy:
      "Campaigns were separated by product and buying signal. Creative concepts were refreshed around use cases, local conditions and offer clarity.",
    impact:
      "Shopify sales increased to AED 35.2K, while Meta maintained an average reported cost per purchase of AED 51.46.",
    evidence:
      "The Shopify snapshot confirms AED 35,221.12 in sales, 62 orders, +46% revenue and +77% order growth.",
    proof: "pet",
  },
  {
    id: "confectionery-uae",
    index: "06",
    channel: "Meta Ads · Premium confectionery · UAE",
    title: "AED 200K+ in store revenue for a seasonal premium category",
    intro:
      "The strategy balanced evergreen acquisition with promotional demand, product priorities and retention — important in a category where gifting moments can distort performance.",
    metrics: [
      ["AED 200K+", "store revenue"],
      ["≈ AED 30K", "paid social spend"],
      ["5.9×+", "Meta ROAS periods"],
      ["UAE", "market"],
      ["Meta + email", "growth loop"],
    ],
    challenge:
      "The brand had to protect efficiency outside peak gifting moments while still being ready to accelerate during high-intent periods.",
    strategy:
      "Budget was reallocated by product and season, creative was refreshed around use occasions and email supported recovery and repeat purchase.",
    impact:
      "The store crossed AED 200K in revenue while paid social remained a controllable acquisition channel rather than a one-off promotional spike.",
    evidence:
      "Shopify and paid-media account snapshots were reviewed together to read store revenue against acquisition spend.",
    proof: "confectionery",
  },
];

const reportTabs = ["Overview", "Channels", "Next actions"];

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

function AreaVisual({ area }: { area: string }) {
  if (area === "meta") {
    return (
      <div className="discipline-visual visual-meta" aria-label="Meta Ads testing system">
        <div className="visual-caption">
          <span>Creative testing loop</span>
          <strong>4 signals → 1 scalable direction</strong>
        </div>
        <div className="creative-signal-grid">
          {[
            ["01", "Problem"],
            ["02", "Proof"],
            ["03", "Use case"],
            ["04", "Offer"],
          ].map(([number, label], index) => (
            <div className={index === 2 ? "is-winner" : ""} key={number}>
              <span>{number}</span>
              <strong>{label}</strong>
              <i style={{ width: `${48 + index * 13}%` }} />
            </div>
          ))}
        </div>
        <div className="visual-decision">
          <span>DECISION</span>
          <strong>Scale the message that converts after the click.</strong>
        </div>
      </div>
    );
  }

  if (area === "google") {
    return (
      <div className="discipline-visual visual-google" aria-label="Google Ads demand map">
        <div className="visual-caption">
          <span>Demand architecture</span>
          <strong>Intent decides the budget</strong>
        </div>
        <div className="search-query">best product for high-intent need</div>
        <div className="intent-map">
          {[
            ["Exact intent", "8.7×"],
            ["Category", "5.4×"],
            ["Discovery", "2.1×"],
          ].map(([label, value], index) => (
            <div key={label}>
              <span>{label}</span>
              <i>
                <b style={{ width: `${88 - index * 25}%` }} />
              </i>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="visual-foot">
          <span>QUERY CONTROL</span>
          <span>FEED PRIORITY</span>
          <span>MARGINAL ROAS</span>
        </div>
      </div>
    );
  }

  if (area === "email") {
    return (
      <div className="discipline-visual visual-email" aria-label="Email automation journey">
        <div className="email-preview">
          <img
            src="./assets/email-flow-proof.jpg"
            alt="Example of an abandoned checkout email"
          />
          <span>ABANDONED CHECKOUT / EMAIL 01</span>
        </div>
        <div className="flow-rail">
          {[
            ["01", "Welcome", "New intent"],
            ["02", "Recover", "Cart left"],
            ["03", "Retain", "Order placed"],
          ].map(([number, title, trigger], index) => (
            <div key={number}>
              <i className={index === 1 ? "is-live" : ""}>{number}</i>
              <span>{trigger}</span>
              <strong>{title}</strong>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (area === "reporting") {
    return (
      <div className="discipline-visual visual-reporting" aria-label="Performance report summary">
        <div className="visual-caption">
          <span>Executive view</span>
          <strong>Numbers → meaning → action</strong>
        </div>
        <div className="mini-kpis">
          <div>
            <span>Revenue</span>
            <strong>$72.3K</strong>
            <small>+18.4%</small>
          </div>
          <div>
            <span>ROAS</span>
            <strong>3.93×</strong>
            <small>above target</small>
          </div>
        </div>
        <div className="mini-chart">
          {[35, 46, 41, 58, 53, 71, 68, 88].map((height, index) => (
            <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="visual-decision">
          <span>NEXT MOVE</span>
          <strong>Increase the winning segments by 12%.</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="discipline-visual visual-profit" aria-label="Profitability planning model">
      <div className="visual-caption">
        <span>Commercial guardrails</span>
        <strong>Know the ceiling before scale</strong>
      </div>
      <div className="profit-equation">
        <div>
          <span>AOV</span>
          <strong>$135</strong>
        </div>
        <b>×</b>
        <div>
          <span>Margin</span>
          <strong>48%</strong>
        </div>
        <b>→</b>
        <div className="profit-answer">
          <span>MAX CPA</span>
          <strong>$79</strong>
        </div>
      </div>
      <div className="profit-gauge">
        <i>
          <b />
        </i>
        <div>
          <span>FORECAST CPA</span>
          <strong>$35</strong>
        </div>
        <div>
          <span>ROOM TO SCALE</span>
          <strong>Healthy</strong>
        </div>
      </div>
    </div>
  );
}

function CaseCover({ item }: { item: (typeof cases)[number] }) {
  if (item.proof === "google") {
    return (
      <div className="case-cover case-cover-image tone-blue">
        <img
          src="./assets/google-ui-proof.jpg"
          alt="Cropped Google Ads account metrics without reporting dates"
        />
        <span className="proof-chip">ACCOUNT SNAPSHOT</span>
      </div>
    );
  }

  if (item.proof === "ltv") {
    return (
      <div className="case-cover case-cover-ltv tone-violet">
        <div className="cover-label">REVENUE AFTER ACQUISITION</div>
        <div className="ltv-ring">
          <span>RETURNING RATE</span>
          <strong>28.57%</strong>
        </div>
        <div className="ltv-cover-shift">
          <span>9.2×</span>
          <i>→</i>
          <strong>12.8×</strong>
        </div>
      </div>
    );
  }

  if (item.proof === "global") {
    return (
      <div className="case-cover case-cover-global tone-coral">
        <div className="cover-label">CREATIVE-LED SCALE</div>
        <strong className="cover-big-number">$42.4K</strong>
        <div className="creative-tape">
          <span>UGC</span>
          <span>VIDEO</span>
          <span>STOP-MOTION</span>
        </div>
        <div className="market-dots">
          {["US", "CA", "UK", "AU", "DE"].map((market) => (
            <i key={market}>{market}</i>
          ))}
        </div>
      </div>
    );
  }

  if (item.proof === "launch") {
    return (
      <div className="case-cover case-cover-image tone-amber">
        <img
          src="./assets/product-launch-proof.jpg"
          alt="Cropped launch reporting showing revenue and ROI"
        />
        <span className="proof-chip">FIRST-MONTH SIGNAL</span>
      </div>
    );
  }

  if (item.proof === "pet") {
    return (
      <div className="case-cover case-cover-image tone-pink">
        <img
          src="./assets/pet-store-proof.png"
          alt="Cropped Shopify performance snapshot"
        />
        <span className="proof-chip">SHOPIFY SNAPSHOT</span>
      </div>
    );
  }

  return (
    <div className="case-cover case-cover-seasonal tone-plum">
      <div className="cover-label">PREMIUM E-COMMERCE · UAE</div>
      <strong className="cover-big-number">AED 200K+</strong>
      <div className="season-line" aria-hidden="true">
        {[32, 42, 38, 61, 48, 72, 56, 88, 69, 94].map((height, index) => (
          <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="season-tags">
        <span>EVERGREEN</span>
        <span>PEAKS</span>
        <span>RETENTION</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeArea, setActiveArea] = useState("meta");
  const [openCase, setOpenCase] = useState("google-retail");
  const [reportTab, setReportTab] = useState("Overview");

  const [adSpend, setAdSpend] = useState(12000);
  const [cpc, setCpc] = useState(0.85);
  const [conversionRate, setConversionRate] = useState(2.4);
  const [averageOrder, setAverageOrder] = useState(135);
  const [margin, setMargin] = useState(48);
  const [repeatUplift, setRepeatUplift] = useState(22);
  const [managementFee, setManagementFee] = useState(1200);

  const selectedArea =
    performanceAreas.find((area) => area.id === activeArea) ??
    performanceAreas[0];

  const calculator = useMemo(() => {
    const visitors = adSpend / Math.max(cpc, 0.01);
    const orders = visitors * (conversionRate / 100);
    const firstRevenue = orders * averageOrder;
    const revenue90 = firstRevenue * (1 + repeatUplift / 100);
    const cpa = adSpend / Math.max(orders, 1);
    const roas = revenue90 / Math.max(adSpend, 1);
    const contribution = revenue90 * (margin / 100) - adSpend - managementFee;
    const breakEvenRoas =
      (adSpend + managementFee) /
      Math.max(adSpend * (margin / 100), 0.01);
    const managementPerOrder = managementFee / Math.max(orders, 1);
    const maxCpa =
      averageOrder * (1 + repeatUplift / 100) * (margin / 100) -
      managementPerOrder;

    return {
      visitors,
      orders,
      firstRevenue,
      revenue90,
      cpa,
      roas,
      contribution,
      breakEvenRoas,
      maxCpa,
    };
  }, [
    adSpend,
    averageOrder,
    conversionRate,
    cpc,
    managementFee,
    margin,
    repeatUplift,
  ]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Victoria Omela home">
          VO<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#system">System</a>
          <a href="#cases">Cases</a>
          <a href="#economics">Economics</a>
          <a href="#reporting">Reporting</a>
        </nav>
        <a className="header-contact" href="#contact">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              Victoria Omela · Performance Marketer
            </div>
            <h1>
              Paid growth.
              <br />
              <span>With the numbers behind it.</span>
            </h1>
            <p className="hero-lede">
              I connect Meta Ads, Google Ads, email marketing and commercial
              reporting into one performance system — so every budget decision
              has a business reason behind it.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#system">
                Explore the system <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-ghost" href="#cases">
                View selected cases
              </a>
            </div>
            <div className="hero-proof" aria-label="Experience summary">
              <div>
                <strong>30+</strong>
                <span>niches</span>
              </div>
              <div>
                <strong>3</strong>
                <span>core markets</span>
              </div>
              <div>
                <strong>1</strong>
                <span>connected system</span>
              </div>
            </div>
          </div>

          <div className="hero-visual hero-console" aria-label="Connected performance system">
            <div className="console-glow" />
            <div className="console-window">
              <div className="console-topbar">
                <span>PERFORMANCE OS / LIVE MODEL</span>
                <i>
                  <b />
                  Connected
                </i>
              </div>
              <div className="console-core">
                <div className="console-orbit orbit-meta">
                  <span>Meta</span>
                </div>
                <div className="console-orbit orbit-google">
                  <span>Google</span>
                </div>
                <div className="console-orbit orbit-email">
                  <span>Email</span>
                </div>
                <div className="console-center">
                  <small>ONE COMMERCIAL</small>
                  <strong>SYSTEM</strong>
                  <span>acquire · retain · scale</span>
                </div>
              </div>
              <div className="console-metrics">
                <div>
                  <span>ACCEPTABLE CPA</span>
                  <strong>Calculated</strong>
                </div>
                <div>
                  <span>BLENDED RETURN</span>
                  <strong>Visible</strong>
                </div>
                <div>
                  <span>NEXT DECISION</span>
                  <strong>Clear</strong>
                </div>
              </div>
            </div>
            <div className="console-float console-float-one">
              <span>INPUT</span>
              <strong>Business economics</strong>
            </div>
            <div className="console-float console-float-two">
              <span>OUTPUT</span>
              <strong>Profitable next move</strong>
            </div>
          </div>
        </div>
        <div className="hero-footnote">
          <span>Acquisition</span>
          <i />
          <span>Conversion</span>
          <i />
          <span>Retention</span>
          <i />
          <span>Profitability</span>
        </div>
      </section>

      <div className="signal-strip" aria-hidden="true">
        <div>
          PERFORMANCE IS NOT A CHANNEL <span>✦</span> PERFORMANCE IS A SYSTEM{" "}
          <span>✦</span> PERFORMANCE IS NOT A CHANNEL <span>✦</span>{" "}
          PERFORMANCE IS A SYSTEM <span>✦</span>
        </div>
      </div>

      <section className="system-section section-shell" id="system">
        <div className="section-heading split-heading">
          <div>
            <span className="section-index">01 / THE SYSTEM</span>
            <h2>
              Five disciplines.
              <br />
              One commercial logic.
            </h2>
          </div>
          <p>
            Paid acquisition works better when each channel answers the same
            question: what has to happen for this budget to create profitable
            revenue?
          </p>
        </div>

        <div className="system-layout">
          <div className="area-list" role="tablist" aria-label="Performance areas">
            {performanceAreas.map((area) => (
              <button
                className={`area-button ${
                  activeArea === area.id ? "is-active" : ""
                }`}
                key={area.id}
                type="button"
                role="tab"
                aria-selected={activeArea === area.id}
                aria-controls="area-detail"
                onClick={() => setActiveArea(area.id)}
              >
                <span>{area.number}</span>
                <strong>{area.label}</strong>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>

          <div
            className={`area-detail area-${selectedArea.color}`}
            id="area-detail"
            role="tabpanel"
          >
            <div className="area-detail-head">
              <span>{selectedArea.number}</span>
              <small>ACTIVE LAYER</small>
            </div>
            <div className="area-detail-body">
              <div className="area-detail-copy">
                <h3>{selectedArea.title}</h3>
                <p>{selectedArea.copy}</p>
                <ul>
                  {selectedArea.bullets.map((bullet) => (
                    <li key={bullet}>
                      <span aria-hidden="true">+</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="signal-card">
                  <span>Decision signal</span>
                  <strong>{selectedArea.signal}</strong>
                </div>
              </div>
              <AreaVisual area={selectedArea.id} />
            </div>
          </div>
        </div>
      </section>

      <section className="economics-section" id="economics">
        <div className="section-shell">
          <div className="section-heading split-heading light-heading">
            <div>
              <span className="section-index">03 / THE ECONOMICS</span>
              <h2>
                Scale starts
                <br />
                before the campaign.
              </h2>
            </div>
            <p>
              Before increasing the budget, I calculate what the business can
              afford to pay for a customer — and what has to happen for that
              investment to remain profitable.
            </p>
          </div>

          <div className="calculator-shell">
            <div className="calculator-inputs">
              <div className="calculator-title">
                <span>PROFITABILITY MODEL / LIVE DEMO</span>
                <strong>Adjust the assumptions</strong>
              </div>

              <label>
                <span>
                  Monthly ad spend <strong>{formatMoney(adSpend)}</strong>
                </span>
                <input
                  type="range"
                  min="3000"
                  max="50000"
                  step="500"
                  value={adSpend}
                  onChange={(event) => setAdSpend(Number(event.target.value))}
                />
              </label>

              <label>
                <span>
                  Cost per click <strong>${cpc.toFixed(2)}</strong>
                </span>
                <input
                  type="range"
                  min="0.25"
                  max="3"
                  step="0.05"
                  value={cpc}
                  onChange={(event) => setCpc(Number(event.target.value))}
                />
              </label>

              <label>
                <span>
                  Website conversion{" "}
                  <strong>{conversionRate.toFixed(1)}%</strong>
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="6"
                  step="0.1"
                  value={conversionRate}
                  onChange={(event) =>
                    setConversionRate(Number(event.target.value))
                  }
                />
              </label>

              <label>
                <span>
                  Average order <strong>{formatMoney(averageOrder)}</strong>
                </span>
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="5"
                  value={averageOrder}
                  onChange={(event) =>
                    setAverageOrder(Number(event.target.value))
                  }
                />
              </label>

              <div className="input-pair">
                <label>
                  <span>
                    Gross margin <strong>{margin}%</strong>
                  </span>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    step="1"
                    value={margin}
                    onChange={(event) => setMargin(Number(event.target.value))}
                  />
                </label>
                <label>
                  <span>
                    90-day uplift <strong>+{repeatUplift}%</strong>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="70"
                    step="1"
                    value={repeatUplift}
                    onChange={(event) =>
                      setRepeatUplift(Number(event.target.value))
                    }
                  />
                </label>
              </div>

              <label>
                <span>
                  Monthly management{" "}
                  <strong>{formatMoney(managementFee)}</strong>
                </span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={managementFee}
                  onChange={(event) =>
                    setManagementFee(Number(event.target.value))
                  }
                />
              </label>
            </div>

            <div className="calculator-output">
              <div className="model-status">
                <span
                  className={
                    calculator.contribution >= 0 ? "positive" : "negative"
                  }
                >
                  {calculator.contribution >= 0
                    ? "Profitable scenario"
                    : "Below break-even"}
                </span>
                <small>Illustrative 90-day view</small>
              </div>

              <div className="output-grid">
                <div>
                  <span>Forecast ROAS</span>
                  <strong>{calculator.roas.toFixed(2)}×</strong>
                  <small>
                    break-even {calculator.breakEvenRoas.toFixed(2)}×
                  </small>
                </div>
                <div>
                  <span>Maximum CPA</span>
                  <strong>{formatMoney(calculator.maxCpa)}</strong>
                  <small>forecast CPA {formatMoney(calculator.cpa)}</small>
                </div>
                <div>
                  <span>90-day revenue</span>
                  <strong>{formatMoney(calculator.revenue90)}</strong>
                  <small>
                    first purchase {formatMoney(calculator.firstRevenue)}
                  </small>
                </div>
                <div>
                  <span>Contribution</span>
                  <strong
                    className={
                      calculator.contribution >= 0 ? "good" : "warning"
                    }
                  >
                    {formatMoney(calculator.contribution)}
                  </strong>
                  <small>after media + management</small>
                </div>
              </div>

              <div className="model-funnel">
                <div>
                  <span>Qualified visits</span>
                  <strong>{formatNumber(calculator.visitors)}</strong>
                </div>
                <i aria-hidden="true">→</i>
                <div>
                  <span>Forecast orders</span>
                  <strong>{formatNumber(calculator.orders)}</strong>
                </div>
                <i aria-hidden="true">→</i>
                <div>
                  <span>Repeat value</span>
                  <strong>+{repeatUplift}%</strong>
                </div>
              </div>

              <p className="model-note">
                This is a simplified interface. The working model is adapted to
                the business&apos;s cost structure, shipping, fees, discounts,
                channel mix and customer lifetime value.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cases-section section-shell" id="cases">
        <div className="section-heading split-heading">
          <div>
            <span className="section-index">02 / SELECTED CASES</span>
            <h2>
              Results — with the
              <br />
              thinking left in.
            </h2>
          </div>
          <p>
            Each case opens beyond the headline number: context, strategy and
            the commercial signal that made the result useful.
          </p>
        </div>

        <div className="case-grid">
          {cases.map((item) => {
            const isOpen = openCase === item.id;
            return (
              <article
                className={`case-card ${isOpen ? "is-open" : ""}`}
                key={item.id}
              >
                <button
                  className="case-card-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`case-panel-${item.id}`}
                  onClick={() => setOpenCase(isOpen ? "" : item.id)}
                >
                  <CaseCover item={item} />
                  <span className="case-card-summary">
                    <span className="case-card-meta">
                      <small>CASE {item.index}</small>
                      <small>{item.channel}</small>
                    </span>
                    <strong className="case-card-title">{item.title}</strong>
                    <span className="case-card-footer">
                      <span>
                        <strong>{item.metrics[0][0]}</strong>
                        <small>{item.metrics[0][1]}</small>
                      </span>
                      <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                    </span>
                  </span>
                </button>

                <div
                  className="case-card-panel"
                  id={`case-panel-${item.id}`}
                  hidden={!isOpen}
                >
                  <p className="case-intro">{item.intro}</p>

                  <div className="case-metrics">
                    {item.metrics.map(([value, label]) => (
                      <div key={`${item.id}-${label}`}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>

                  {item.proof === "ltv" && (
                    <div className="retention-visual">
                      <div className="retention-bar">
                        <span style={{ width: "71.43%" }}>
                          <strong>106</strong> new-customer orders
                        </span>
                        <span style={{ width: "28.57%" }}>
                          <strong>42</strong> returning orders
                        </span>
                      </div>
                      <div className="roas-shift">
                        <div>
                          <span>FIRST ORDER VIEW</span>
                          <strong>9.2×</strong>
                        </div>
                        <i aria-hidden="true">→</i>
                        <div>
                          <span>FULL REVENUE VIEW</span>
                          <strong>12.8×</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="case-story">
                    <div>
                      <span>THE CHALLENGE</span>
                      <p>{item.challenge}</p>
                    </div>
                    <div>
                      <span>THE STRATEGY</span>
                      <p>{item.strategy}</p>
                    </div>
                    <div>
                      <span>THE IMPACT</span>
                      <p>{item.impact}</p>
                    </div>
                  </div>

                  <aside className="case-evidence">
                    <span>VERIFIED CONTEXT</span>
                    <p>{item.evidence}</p>
                  </aside>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="report-section" id="reporting">
        <div className="section-shell">
          <div className="section-heading split-heading light-heading">
            <div>
              <span className="section-index">04 / REPORTING</span>
              <h2>
                A report should end
                <br />
                with a decision.
              </h2>
            </div>
            <p>
              The client does not receive a platform export. They receive a
              clear commercial view: what was invested, what came back, what
              changed and what we do next.
            </p>
          </div>

          <div className="report-window">
            <div className="report-topbar">
              <div>
                <span className="window-dot red" />
                <span className="window-dot amber" />
                <span className="window-dot green" />
              </div>
              <strong>Sample performance report</strong>
              <span>Executive view</span>
            </div>

            <div className="report-tabs" role="tablist" aria-label="Report views">
              {reportTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={reportTab === tab}
                  className={reportTab === tab ? "is-active" : ""}
                  onClick={() => setReportTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="report-content">
              {reportTab === "Overview" && (
                <div className="report-overview">
                  <div className="report-kpis">
                    <div>
                      <span>Paid revenue</span>
                      <strong>$72,312</strong>
                      <small>+18.4% vs previous period</small>
                    </div>
                    <div>
                      <span>Ad spend</span>
                      <strong>$18,400</strong>
                      <small>within approved plan</small>
                    </div>
                    <div>
                      <span>Blended ROAS</span>
                      <strong>3.93×</strong>
                      <small>target 3.40×</small>
                    </div>
                    <div>
                      <span>Orders / CPA</span>
                      <strong>536 / $34.33</strong>
                      <small>AOV $134.91</small>
                    </div>
                  </div>

                  <div className="report-chart-card">
                    <div className="chart-head">
                      <div>
                        <span>Revenue vs spend</span>
                        <strong>Eight-week trajectory</strong>
                      </div>
                      <span className="legend">
                        <i className="legend-revenue" /> Revenue
                        <i className="legend-spend" /> Spend
                      </span>
                    </div>
                    <div className="bar-chart" aria-label="Revenue and spend chart">
                      {[48, 55, 52, 64, 70, 66, 83, 92].map((height, index) => (
                        <div key={height + index}>
                          <span style={{ height: `${height}%` }} />
                          <i style={{ height: `${Math.max(18, height / 3)}%` }} />
                          <small>W{index + 1}</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="report-insight">
                    <span>WHAT ACTUALLY CHANGED</span>
                    <p>
                      Google Shopping gained efficiency after the feed and
                      category split was tightened. On Meta, two UGC concepts
                      held acquisition cost below the blended target while
                      increasing order volume.
                    </p>
                    <strong>Decision: increase budget by 12% in the winning segments.</strong>
                  </div>
                </div>
              )}

              {reportTab === "Channels" && (
                <div className="channel-view">
                  <div className="channel-table" role="table" aria-label="Channel performance">
                    <div className="channel-row channel-head" role="row">
                      <span>Channel</span>
                      <span>Spend</span>
                      <span>Revenue</span>
                      <span>Orders</span>
                      <span>CPA</span>
                      <span>ROAS</span>
                    </div>
                    <div className="channel-row" role="row">
                      <strong>Meta Ads</strong>
                      <span>$10,200</span>
                      <span>$36,720</span>
                      <span>288</span>
                      <span>$35.42</span>
                      <strong>3.60×</strong>
                    </div>
                    <div className="channel-row" role="row">
                      <strong>Google Ads</strong>
                      <span>$8,200</span>
                      <span>$35,592</span>
                      <span>248</span>
                      <span>$33.06</span>
                      <strong>4.34×</strong>
                    </div>
                    <div className="channel-row channel-total" role="row">
                      <strong>Total paid</strong>
                      <strong>$18,400</strong>
                      <strong>$72,312</strong>
                      <strong>536</strong>
                      <strong>$34.33</strong>
                      <strong>3.93×</strong>
                    </div>
                  </div>
                  <div className="channel-note">
                    <span>READING THE TABLE</span>
                    <h3>Scale the segment, not the average.</h3>
                    <p>
                      The blended result is healthy, but the budget decision is
                      made one level deeper — by product, campaign, margin and
                      incremental acquisition cost.
                    </p>
                  </div>
                </div>
              )}

              {reportTab === "Next actions" && (
                <div className="actions-view">
                  {[
                    [
                      "01",
                      "Scale",
                      "Increase Google Shopping and the two winning Meta concepts by 12%, in controlled steps.",
                    ],
                    [
                      "02",
                      "Protect",
                      "Keep the blended CPA ceiling at $38 and reduce budget if post-click conversion weakens.",
                    ],
                    [
                      "03",
                      "Build",
                      "Launch the next creative batch and a post-purchase flow focused on the second-order window.",
                    ],
                  ].map(([number, title, copy]) => (
                    <article key={number}>
                      <span>{number}</span>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-shell about-grid">
          <div className="about-photo">
            <img
              src="./assets/victoria-hero.jpg"
              alt="Victoria Omela"
            />
            <span>EUROPE · US · UAE</span>
          </div>
          <div className="about-copy">
            <span className="section-index">05 / ABOUT</span>
            <h2>Victoria Omela</h2>
            <p className="about-lede">
              Performance marketer working across paid acquisition, retention
              and business-facing reporting.
            </p>
            <p>
              I work with e-commerce and service businesses across Europe, the
              US and the UAE. My experience covers more than 30 niches — from
              retail, fashion and pets to education, beauty, travel and premium
              confectionery.
            </p>
            <p>
              The objective is simple: make the advertising system measurable,
              commercially grounded and easier to scale with control.
            </p>
            <div className="tool-stack">
              {[
                "Meta Ads",
                "Google Ads",
                "Shopify",
                "GA4",
                "Klaviyo",
                "Merchant Center",
              ].map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-card">
          <div className="contact-copy">
            <span className="section-index">NEXT STEP</span>
            <h2>
              Let&apos;s find where the next stage of profitable growth can
              come from.
            </h2>
            <p>
              Tell me what you sell, where you sell it and what currently feels
              stuck. I&apos;ll tell you what I would look at first.
            </p>
            <div className="contact-actions">
              <a
                className="button button-dark"
                href="mailto:vika2309200032@gmail.com?subject=Performance%20marketing%20project"
              >
                Email Victoria <span aria-hidden="true">↗</span>
              </a>
              <a
                className="button button-light"
                href="https://t.me/vikaomela"
                target="_blank"
                rel="noreferrer"
              >
                Telegram @vikaomela <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="contact-signal" aria-label="What to include in the first message">
            <span>START WITH THREE THINGS</span>
            <ol>
              <li>
                <i>01</i>
                <strong>What you sell</strong>
              </li>
              <li>
                <i>02</i>
                <strong>Where you sell it</strong>
              </li>
              <li>
                <i>03</i>
                <strong>What feels stuck</strong>
              </li>
            </ol>
            <p>Europe · US · UAE</p>
          </div>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <strong>VO<span>.</span></strong>
        <p>Victoria Omela · Performance Marketing</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
