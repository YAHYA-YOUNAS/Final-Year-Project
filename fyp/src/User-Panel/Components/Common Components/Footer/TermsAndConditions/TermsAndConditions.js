import React from "react";
import { Link } from "react-router-dom";
import "./TermsAndConditions.css";

function PrivacyPolicy() {
  return (
    <div className="terms-and-conditions">
      <h1>Terms and Conditions</h1>
      <div className="main-terms-and-conditions">
        <p>
          These terms and conditions govern your use of the site, including your
          participation in our online discussion forum Traveler's Lounge
          (whether you're registered, contributing content or just browsing).
          Please read and check these terms regularly as they may change from
          time to time.
        </p>
        <ul>
          <li>
            <a href="#usingOurSite">Using our site</a>
          </li>
          <li>
            <a href="#trademarkAndCopyright">
              PakiTours's trademarks and copyright
            </a>
          </li>
          <li>
            <a href="#contributingToSite">Contributing to the site</a>
          </li>
          <li>
            <a href="#removalAndTermination">
              Removal of content and termination of accounts
            </a>
          </li>
          <li>
            <a href="#reportingAbuse">Reporting abuse</a>
          </li>
          <li>
            <a href="#reportingDefamation">Reporting defamation</a>
          </li>
          <li>
            <a href="#reportingCopyright">Reporting copyright infringements</a>
          </li>
          <li>
            <a href="#yourPrivacy">Your privacy</a>
          </li>
          <li>
            <a href="#liability">Liability</a>
          </li>
        </ul>
      </div>

      <h3 id="usingOurSite">Using our site</h3>
      <p>
        By using PakiTours website, you agree to be{" "}
        <span>bound by these terms: </span> <br />
        <ul>
          <li>
            <span>No commercial use</span> of site is permitted. You may use the
            site for personal, non-commercial purposes only.
          </li>
          <li>
            <span>If you are under the age of 16</span> you need your parents'
            permission before using the site or registering.
          </li>
        </ul>
      </p>

      <h3 id="trademarkAndCopyright">PakiTours's trademarks and copyright</h3>
      <p>
        <span>All content on the site</span> is owned by PakiTours or licensed
        to us by our registered users and other licensees. You may not copy,
        store, scrape or use any part of our site without permission.
      </p>
      <p>
        <span>Our trade marks</span> (including but not limited to the
        PakiTours, PakiTours Application trade marks) may not be used in any way
        or for any purpose without our permission.
      </p>

      <h3 id="contributingToSite">Contributing to the site</h3>
      <p>
        If you engage with someone else's <span>application</span> on a site
        (e.g. using or posting content on the application), an independent legal
        relationship is formed between you and the application provider. An
        application provider may impose terms on your use of their application.
      </p>
      <p>
        You agree that all of your contribution to the site is your own work.
        <span> You license us</span> the non-exclusive, perpetual, irrevocable,
        royalty-free, worldwide rights to reproduce, communicate, edit, store,
        adapt or otherwise use any content you upload to the site, including any
        feedback that you submit through the site, via third party applications
        available through the site, on the site and in our other products (your
        content). This includes the right to sublicense to others at our
        discretion.
      </p>
      <p>
        <span>You also consent</span> to your content being altered, edited or
        adapted for such uses, or to ensure your content does not infringe these
        terms or breach the law, as we see fit. Although we generally attribute
        you as the author, it's not always possible. So you consent to us not
        attributing authorship to you, or only attributing your registered
        'handle'. We will ask you before publishing your real name.
      </p>
      <p>
        <span>Prohibited content.</span> You must ensure that your content does
        not contain anything that breaches any laws or rights, including by:
      </p>
      <ul>
        <li>defaming any person</li>
        <li>breaching any intellectual property rights</li>
        <li>
          containing personal information (contrary to our{" "}
          <Link
            style={{ color: "#007bff" }}
            className="footer-link"
            to="/privacyPolicy"
          >
            privacy policy
          </Link>
          )
        </li>
        <li>containing commercial advertising</li>
        <li>
          containing excessively coarse language or content which would be
          unrated by the Pakistan Censor Board (see www.pemra.gov.pk)
        </li>
      </ul>

      <h3 id="removalAndTermination">
        Removal of content and termination of accounts
      </h3>
      <p>We may remove your content from the site in our discretion.</p>
      <p>
        We may terminate or suspend your registration (and any future accounts)
        if you have breached these terms multiple times or if the breach is
        serious.
      </p>

      <h3 id="reportingAbuse">Reporting abuse</h3>
      <p>
        If you believe any content on our site infringes these terms, please use
        the report abuse function available throughout the site.
      </p>

      <h3 id="reportingDefamation">Reporting defamation</h3>
      <p>
        A valid defamation notification must contain the following information:
      </p>
      <ol>
        <li>Your name and email address.</li>
        <li>
          The location of the comments on our website that you are referring to,
          including what the comments are and why you believe they are
          defamatory.
        </li>
        <li>
          The meaning that you attribute to the comments and what aspects you
          believe are incorrect or just opinions.
        </li>
        <li>
          Confirmation that you do not have sufficient contact details of the
          users who have posted the comments (the Poster/s) to pursue this
          matter directly with those Poster/s.
        </li>
        <li>
          Confirmation that you consent to PakiTours providing your name and/or
          email to the Posters.
        </li>
      </ol>
      <p>
        Please note that your notification must be in writing and signed either
        by hardcopy or electronically by email to info@pakitours.pk with
        'Defamation notification' in the subject line.
      </p>
      <p>
        Upon receipt of a valid defamation notification, we will contact the
        Poster/s in relation to their comments.
      </p>

      <h3 id="reportingCopyright">Reporting copyright infringements</h3>
      <p>
        If you believe that any content on our site infringes your copyright,
        please notify us by providing a DMCA notice to our designated copyright
        agent at info@pakitours.pk
      </p>
      <p>Your notification must include the following:</p>
      <ol>
        <li>
          Identification of the copyrighted work or works you believe have been
          infringed and the holder of the copyright if you are acting on their
          behalf.
        </li>
        <li>
          Identification of the material that you believe to be infringing
          including its location on the site.
        </li>
        <li>
          Your contact information including name and address, e-mail and
          telephone number.
        </li>
        <li>
          A statement that:
          <ul>
            <li>
              you believe in good faith that the use of the material was not
              authorized by the owner of the work, its agent, or the law.
            </li>
            <li>
              the information in the notification is accurate, and under penalty
              of perjury, that you are, or are authorized to act on behalf of,
              the owner of an exclusive right that is allegedly infringed.
            </li>
            <li>
              you acknowledge that the notice will be sent to the user who
              uploaded the material at issue.
            </li>
          </ul>
        </li>
        <li>
          A physical or electronic signature of the copyright owner or a person
          authorised to act on their behalf.
        </li>
      </ol>
      <p>
        Upon receipt of a valid DMCA notice, PakiTours will as soon as possible
        remove the infringing material and provide a copy of the notice to the
        user who uploaded the material.
      </p>

      <h3 id="yourPrivacy">Your privacy</h3>
      <p>
        The purposes for which we collect your personal information when you
        register or email us are: administering the site, sending you a
        password, contacting you about your content and keeping in touch with
        you.
      </p>
      <p>
        You can access and update your personal information in the 'profile'
        section at any time.
      </p>
      <p>
        disclose information about you to our authors (some of whom work on
        contract to us). If your content breaches these terms or the law, we may
        pass your details and IP address on to a law enforcement agency. Don't
        worry! We won't sell your contact details to marketing companies for
        spamming!
      </p>
      <p>
        To find out more, please read our{" "}
        <Link
          style={{ color: "#007bff" }}
          className="footer-link"
          to="/privacyPolicy"
        >
          privacy policy
        </Link>
        .
      </p>

      <h3 id="liability">Liability and Disclaimer</h3>
      <p>You must:</p>
      <ol>
        <li>
          own all of the work you upload to the site or have the permission from
          the owner of the content to upload it.
        </li>
        <li>
          be able to grant PakiTours the rights under these Terms and Conditions
          (so, for example, you cannot grant us exclusive rights if you have
          already granted someone else exclusive rights)
        </li>
        <li>
          obtain the consent of the owner of any work incorporated into the
          content you upload on the site.
        </li>
      </ol>
      <p>
        Because serious legal consequences can happen to you, PakiTours, and
        other parties if you do not (like legal action for infringement).
      </p>
      <p>
        You indemnify PakiTours against all losses, costs and expenses directly
        incurred by PakiTours, in connection with a demand, allegation, action,
        proceeding or claim that you do not own all of your work, you are not
        able to grant PakiTours rights or you do not have the consent of an
        owner to incorporate their work into yours. PakiTours must take
        reasonable steps to mitigate its loss.
      </p>
      <p>
        <span>Any legal issues </span>will be dealt with under the laws of
        Pakistan.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
