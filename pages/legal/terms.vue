<script lang="ts" setup>
const contactEmail = useRuntimeConfig().public.contactEmail
</script>

<template>
  <div class="prose dark:prose-invert mt-24 mx-auto max-w-[80ch]">
    <h1 class="text-center">Terms of Service</h1>

    <p class="text-center">Last updated: November 29, 2024</p>

    <h2>Agreement to Terms</h2>
    <p>
      These Terms of Service ("Terms") govern your access to and use of Webry SaaS Template ("the Service"). By
      accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms,
      you may not access the Service.
    </p>

    <h2>Intellectual Property</h2>
    <p>
      The Service and its original content, features, and functionality are and will remain the exclusive property of
      Webry and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and
      trade dress may not be used in connection with any product or service without our prior written consent.
    </p>

    <h2>User Accounts</h2>
    <p>
      When you create an account with us, you must provide accurate, complete, and current information. Failure to do so
      constitutes a breach of the Terms, which may result in immediate termination of your account.
    </p>

    <p>You are responsible for:</p>
    <ul>
      <li>Maintaining the confidentiality of your account and password</li>
      <li>Restricting access to your computer and/or account</li>
      <li>Accepting responsibility for any and all activities that occur under your account</li>
      <li>Notifying us immediately of any unauthorized use of your account or other security breaches</li>
    </ul>

    <h2>User Content</h2>
    <p>
      Our Service allows you to post, link, store, share and otherwise make available certain information, text,
      graphics, videos, or other material. You are responsible for the content that you post, including its legality,
      reliability, and appropriateness.
    </p>

    <p>
      By posting content, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and
      distribute such content on and through the Service. You retain any and all rights to any content you submit, post
      or display on or through the Service and you are responsible for protecting those rights.
    </p>

    <h2>Acceptable Use</h2>
    <p>You agree not to use the Service:</p>
    <ul>
      <li>In any way that violates any applicable national or international law or regulation</li>
      <li>
        To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail",
        "chain letter," "spam," or any other similar solicitation
      </li>
      <li>
        To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or
        entity
      </li>
      <li>
        In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or
        harmful
      </li>
      <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
    </ul>

    <h2>Termination</h2>
    <p>
      We may terminate or suspend your account immediately, without prior notice or liability, for any reason
      whatsoever, including without limitation if you breach the Terms.
    </p>

    <p>
      Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you
      may simply discontinue using the Service or contact us for account deletion.
    </p>

    <h2>Limitation of Liability</h2>
    <p>
      In no event shall Webry, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for
      any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of
      profits, data, use, goodwill, or other intangible losses, resulting from:
    </p>
    <ul>
      <li>Your access to or use of or inability to access or use the Service</li>
      <li>Any conduct or content of any third party on the Service</li>
      <li>Any content obtained from the Service</li>
      <li>Unauthorized access, use or alteration of your transmissions or content</li>
    </ul>

    <h2>Disclaimer</h2>
    <p>
      Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The
      Service is provided without warranties of any kind, whether express or implied, including, but not limited to,
      implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of
      performance.
    </p>

    <h2>Changes to Terms</h2>
    <p>
      We reserve the right to modify or replace these Terms at any time. If a revision is material we will try to
      provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be
      determined at our sole discretion.
    </p>

    <p>
      By continuing to access or use our Service after those revisions become effective, you agree to be bound by the
      revised Terms. If you do not agree to the new Terms, please stop using the Service.
    </p>

    <h2>Governing Law</h2>
    <p>
      These Terms shall be governed and construed in accordance with the laws of Germany, without regard to its conflict
      of law provisions.
    </p>

    <h2>Contact Us</h2>
    <p>If you have any questions about these Terms, please contact us:</p>
    <ul>
      <li>By email: {{ contactEmail }}</li>
      <li>By visiting this page on our website: https://saas.webry.com/contact</li>
    </ul>
  </div>
</template>
