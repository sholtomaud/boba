import{n as e,r as t,t as n,u as r}from"./index-mWtkDaPn.js";import{s as i}from"./metrics-DrWwOoaN.js";var a=`<main class="doc">
  <p class="eyebrow">Methodology</p>
  <h1>How the numbers are calculated</h1>
  <section class="why" data-why hidden>
    <h2>Why this repository?</h2>
    <p data-why-text></p>
    <p data-why-source hidden>
      <a data-why-link target="_blank" rel="noopener noreferrer">Source</a>
    </p>
  </section>

  <p class="lede">
    Every number on the dashboard comes from files that a GitHub Actions
    workflow rebuilds <span data-schedule>on a schedule</span>, chiefly
    <a data-csv-link target="_blank" rel="noopener noreferrer"
      ><code>data.csv</code></a
    >, from the issues of
    <a data-tracked-link target="_blank" rel="noopener noreferrer"></a>. The
    workflow runs
    <a data-project-link target="_blank" rel="noopener noreferrer"
      >Repo SRE Dashboard</a
    >, a GitHub Action, and publishes this page to the repository's GitHub
    Pages.
  </p>

  <section>
    <h2>The data</h2>
    <p>
      Each row is a UTC day, and each column is a running total as of the end of
      that day:
    </p>
    <dl>
      <div>
        <dt><code>open</code></dt>
        <dd>Issues open on that day.</dd>
      </div>
      <div>
        <dt><code>agent_closed</code></dt>
        <dd>
          Issues closed so far by an AI agent: a GitHub <em>Bot</em> account, a
          login containing a word such as <code>agent</code>, <code>bot</code>,
          <code>copilot</code>, <code>claude</code> or <code>codex</code>, or a
          login listed in the Action's <code>agent-logins</code> input.
        </dd>
      </div>
      <div>
        <dt><code>human_closed</code></dt>
        <dd>Issues closed so far by anyone else.</dd>
      </div>
    </dl>
    <p>
      Pull requests are counted separately, in <code>pulls.csv</code>. The
      newest row is the day in progress: it is rewritten on every run, and rates
      count it as the part of a day that has passed, not a whole one.
    </p>
  </section>

  <section data-queue-only>
    <h2>Two queues</h2>
    <p>
      This repository keeps a second, file-based queue of issues alongside its
      GitHub issues. The dashboard charts it under "Pull requests and agents";
      every other figure counts the GitHub issues.
    </p>
  </section>

  <section>
    <h2>Pull requests</h2>
    <p>
      Most agent work arrives as pull requests, often through a person's
      account. Each pull request is attributed to one of three origins:
    </p>
    <ul>
      <li>
        <strong>AI agent</strong>: opened by an agent's account, such as
        Copilot's, or a login listed in the <code>agent-logins</code> input.
      </li>
      <li>
        <strong>Person with an agent</strong>: opened by a person, with an agent
        named in a commit's <code>Co-Authored-By</code> trailer or in a
        signature in the description ("Generated with Claude Code").
      </li>
      <li><strong>Person</strong>: neither.</li>
    </ul>
    <p>
      Dependency and CI bots (Dependabot, Renovate and the like) are left out:
      they are automation, not agents writing code. Agents working through a
      person's account with no trailer or signature are counted as people, so
      the agent figures are a lower bound. Merge rate is merged pull requests
      over those merged or closed; time to merge is the median from opening.
    </p>
  </section>

  <section>
    <h2>Project outlook</h2>
    <p>
      The outlook asks whether the repository stays manageable, and when it
      would stop being so. Each class of issue has a limit on how long a new
      issue may wait:
    </p>
    <dl>
      <div>
        <dt>Security</dt>
        <dd>
          <span data-limit="security">7</span> days by default. Issues labelled
          as security or naming a CVE or GitHub advisory. With AI tools finding
          and weaponising vulnerabilities quickly, this is set tighter than the
          two weeks CISA allows US agencies for known exploited vulnerabilities.
        </dd>
      </div>
      <div>
        <dt>Bugs</dt>
        <dd>
          <span data-limit="bug">30</span> days: a common window for
          high-severity findings.
        </dd>
      </div>
      <div>
        <dt>Features and other</dt>
        <dd>
          <span data-limit="other">180</span> days: a request older than half a
          year is in effect abandoned.
        </dd>
      </div>
    </dl>
    <p>
      The limits are Action inputs. A new issue's expected wait follows Little's
      law: the open issues in its class divided by the class's resolutions per
      day. The repository is <strong>unmanageable</strong>
      once any class's expected wait passes its limit. A class with no issues on
      record (no security issues yet, say) is not judged.
    </p>
    <ul>
      <li>
        <strong>The forecast.</strong> GSSK simulates each class, with new
        issues filed by people and by agents, and resolutions by each. Rates are
        calibrated on the last week as Bayesian posteriors. Resolution rates are
        partially pooled: a class with little history starts from the
        repository's overall rate, and its own record takes over as it grows.
        150 runs give the chances below.
      </li>
      <li>
        <strong>Manageability index</strong>: the chance of staying manageable
        up to the forecast horizon, the point where the forecast stops being
        better than a guess.
      </li>
      <li>
        <strong>Loses control</strong>: the first day the chance of having lost
        control reaches 50%, with agents and humans, and again counting people's
        resolutions alone.
      </li>
      <li>
        <strong>Backlog cleared</strong>: when half (and 85%) of the simulations
        reach an empty backlog. While issues arrive at least as fast as they are
        resolved, there is no completion date.
      </li>
      <li>
        <strong>Agents</strong>: the same forecast run again without agents
        filing or resolving. Agents are a benefit if they lower the chance of
        losing control by at least 5 points, a burden if they raise it as much,
        and otherwise judged on the backlog they leave.
      </li>
      <li>
        <strong>Cost</strong>, once prices are set as Action inputs: what
        resolving issues costs a month now, what keeping pace with new issues
        would cost, and when that would exceed each monthly budget: one for
        people's time and one for what agents spend on APIs and CI. Without
        prices the dashboard shows no cost figures.
      </li>
      <li>
        <strong>Reliability</strong>: the model re-run from each past day of the
        record, checking how often its 7-day forecast of the backlog landed
        inside its 90% range. Around 90% means the ranges can be trusted; much
        less means the forecast is overconfident.
      </li>
    </ul>
  </section>

  <section>
    <h2>Who resolves what</h2>
    <p>
      Every rate is shown for agents, for humans and for both. For GitHub
      issues, the resolver is the account that closed the issue. For a
      file-based queue, it is the author of the commit that added the file to
      the resolved folder: any author that is not an automation account counts
      as a human.
    </p>
  </section>

  <section data-queue-only>
    <h2>The file-based queue</h2>
    <p>
      The queue is two folders in <span data-queue-repository></span>:
      <code data-queue-open></code> for open issues and
      <code data-queue-resolved></code> for resolved ones. The tracker counts
      the files in both at the last commit of each day, from the repository's
      first commit, and reads each commit's author; it reads nothing else.
      Resolved per day is the growth of the second folder; new per day is the
      growth of both together, so a retracted issue counts as one fewer filed.
    </p>
  </section>

  <section>
    <h2>How issues were closed</h2>
    <p>
      An issue marked closed is not necessarily an issue fixed. For every closed
      issue the tracker reads the closing event and the last 20 comments, and
      puts it in one of five groups:
    </p>
    <dl>
      <div>
        <dt>Fix referenced</dt>
        <dd>
          A commit or merged pull request closed it, or someone other than the
          reporter pointed to a commit or a release in a comment.
        </dd>
      </div>
      <div>
        <dt>Closed without a referenced fix</dt>
        <dd>Marked completed, with nothing recorded to check it against.</dd>
      </div>
      <div>
        <dt>Declined</dt>
        <dd>Closed as "not planned".</dd>
      </div>
      <div>
        <dt>Withdrawn</dt>
        <dd>Closed by the person who reported it, with no fix referenced.</dd>
      </div>
      <div>
        <dt>Duplicate</dt>
        <dd>Closed as a duplicate of another issue.</dd>
      </div>
    </dl>
    <p>
      "Closures with a linked fix" on the dashboard is the first group's share
      of all closures. The rest of the closing activity cannot be verified from
      the record.
    </p>
    <p>
      Two limits. A genuine fix that nobody linked lands in "closed without a
      referenced fix", so that group is an upper bound on unverified closures,
      not a finding about any one of them. And the tracker checks that a fix is
      referenced, not that the fix is correct.
    </p>
  </section>

  <section>
    <h2>Why a referenced fix is the test</h2>
    <p>
      The link from a closed issue to the commit, pull request or release that
      fixed it is the public trail from a report to its fix. Without it, a
      reader has to take the closure on trust. A best-in-class workflow records:
    </p>
    <ul>
      <li>
        <strong>Every fix links to its issue.</strong> "Fixes #123" in a pull
        request or commit makes GitHub close the issue and record the link, with
        no extra work, which an agent can do every time.
      </li>
      <li>
        <strong>The closing comment says where the fix shipped</strong>: the
        commit or release, so the reporter can confirm it.
      </li>
      <li>
        <strong>The closing reason is accurate</strong>: completed, not planned,
        or duplicate with a link to the original.
      </li>
      <li>
        <strong>Every issue is typed at triage</strong> with a label or issue
        type, so the backlog can be measured by kind.
      </li>
      <li>
        <strong>Internal and public queues are linked.</strong> When work
        tracked elsewhere resolves a public issue, each record points to the
        other.
      </li>
    </ul>
    <p>
      The "Get more from this dashboard" checklist on the dashboard checks
      several of these for this repository.
    </p>
  </section>

  <section>
    <h2>Issue types</h2>
    <p>The tracker reads each issue's type from its labels, then its form:</p>
    <ul>
      <li>
        <strong>Bug reports</strong>: a <code>bug</code>, <code>defect</code> or
        <code>regression</code> label, or the headings of a bug form or template
        ("What happened", "Steps to reproduce", "Describe the bug").
      </li>
      <li>
        <strong>Feature requests</strong>: an <code>enhancement</code> or
        <code>feature</code> label, or a feature form ("Use case", "Proposed
        solution").
      </li>
      <li><strong>Other</strong>: anything else.</li>
    </ul>
    <p>
      The type decides the class in "Issues by class": security, bugs, or
      features and other, each with its own time limit. A backlog of unfixed
      bugs and a backlog of unbuilt features are different problems.
    </p>
  </section>

  <section>
    <h2>Response times</h2>
    <dl>
      <div>
        <dt>Time to first response</dt>
        <dd>
          From an issue being opened to the first comment or closure by someone
          other than the reporter. Routine automation (GitHub Actions,
          Dependabot, stale bots) does not count as a response.
        </dd>
      </div>
      <div>
        <dt>Time to resolution</dt>
        <dd>
          From an issue being opened to its closure, leaving out issues the
          reporter withdrew and duplicates.
        </dd>
      </div>
    </dl>
    <p>
      Both are medians over issues opened in the last 30 days, with the time by
      which 90% were done: the standard service measures for an issue tracker.
    </p>
  </section>

  <section>
    <h2>Indices</h2>
    <dl>
      <div>
        <dt>Opened per issue closed</dt>
        <dd>
          Issues opened in the last week divided by issues closed. Below 1 the
          backlog shrinks; above 1 it grows, and the further above, the faster.
        </dd>
      </div>
      <div>
        <dt>Closures with a linked fix</dt>
        <dd>
          The share of closed issues whose closure references a fix (see "How
          issues were closed"). A low rate means closures cannot be checked
          against the record, whoever made them.
        </dd>
      </div>
      <div>
        <dt>Reopen rate</dt>
        <dd>
          The share of issues closed at least once that were later reopened:
          closures that did not hold.
        </dd>
      </div>
    </dl>
  </section>

  <section>
    <h2>Delivery</h2>
    <p>
      The four DORA metrics, over the last 30 days, each placed in the bands of
      the DORA research (elite, high, medium, low).
    </p>
    <dl>
      <div>
        <dt>Deployment frequency</dt>
        <dd>
          GitHub deployments, leaving out GitHub Pages (publishing this
          dashboard is one). Without deployments, published releases; without
          releases, pull requests merged into the default branch. The dashboard
          says which it used. Elite is at least once a day, high at least
          weekly, medium at least monthly.
        </dd>
      </div>
      <div>
        <dt>Lead time for changes</dt>
        <dd>
          The median time from a pull request being opened to the first delivery
          that includes its merge. Elite is under a day, high under a week,
          medium under a month.
        </dd>
      </div>
      <div>
        <dt>Change failure rate</dt>
        <dd>
          Failed deployments, when deployments record their outcome. Otherwise
          the share of merged pull requests that repair an earlier change: a
          title starting "Revert" or "Hotfix", or a revert, hotfix or rollback
          label. Elite is 5% or less, high 10%, medium 15%.
        </dd>
      </div>
      <div>
        <dt>Time to restore service</dt>
        <dd>
          The median time issues labelled incident, outage, regression, sev0–3
          or p0 stay open. Without such labels it is not measured, rather than
          guessed. Elite is under an hour, high under a day, medium under a
          week.
        </dd>
      </div>
    </dl>
  </section>

  <section>
    <h2>CI health</h2>
    <p>
      Workflow runs triggered by pushes to the default branch over the last 30
      days, leaving out the dashboard's own workflow. Runs passing counts
      successes and failures only, not cancelled or skipped runs. Time back to
      green runs from a workflow's first failure to its next success. A workflow
      whose latest run failed is listed as failing now. It needs the workflow's
      token to have <code>actions: read</code>.
    </p>
  </section>

  <section>
    <h2>Codebase</h2>
    <p>
      From the GitHub API: the languages GitHub detects, and the file tree of
      the default branch, leaving out vendored and built folders such as
      <code>node_modules</code>, <code>vendor</code> and <code>dist</code>. Test
      files are those under a <code>test</code>, <code>tests</code>,
      <code>__tests__</code>, <code>spec</code> or <code>e2e</code> folder, or
      named like <code>*.test.ts</code>, <code>*_test.go</code> or
      <code>test_*.py</code>. Workflows are read to see what triggers them,
      whether they run a test command, which actions they use and whether they
      declare their permissions.
    </p>
  </section>

  <section>
    <h2>The audit</h2>
    <p>
      The <a href="/audit">audit</a> checks how the repository is set up and run
      against current practice: CI and tests, branch rules, automatic dependency
      updates and patching, supply-chain and code scanning, pinned actions and
      least-privilege tokens, security policy, issue forms and labels, linked
      fixes, releases and incident labels, and instructions and attribution for
      AI agents. Each check says what it found, why it matters, and gives a fix
      to copy: a workflow, a config file or a command, filled in for this
      repository's languages and package managers.
    </p>
    <p>
      Setup checks are judged from the repository as it is. Habit checks, such
      as labelling and linking fixes, wait until there is enough history, rather
      than fail a new repository. The score is out of 100, weighted by impact: a
      high-impact check counts three times a low-impact one, and a check that
      could improve earns half.
    </p>
    <p>
      Instruction files for coding agents (AGENTS.md, CLAUDE.md, Copilot's
      instructions) are read, not just found. The audit checks that they say how
      to build and test, ask for test-driven development, explain how to raise
      issues so they are typed, labelled and linked to their fix, set commit and
      pull request rules, cover secrets and security, and keep agent work
      attributed. It also checks that CLAUDE.md imports AGENTS.md, so there is
      one set of rules.
    </p>
    <p>
      With the Action's <code>audit-issues</code> input on, each finding of
      medium impact or more becomes an issue labelled
      <code>repo-sre-audit</code>, updated as the finding changes and closed
      when the check passes. These issues are left out of every issue figure on
      the dashboard, so the audit never moves the numbers it measures.
    </p>
    <p>
      Agents that act on the findings run in GitHub Actions, with their API key
      stored as a repository secret. The dashboard is a static public page, so
      it never holds a key.
    </p>
  </section>

  <p><a href="/" class="back">← Back to the dashboard</a></p>
</main>
`,o=`:host {
  display: block;
}
:host .doc {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1rem 4rem;
  line-height: 1.65;
  color: var(--ink-2);
}
:host h1 {
  margin: 0.5rem 0 1rem;
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--ink);
}
:host h2 {
  margin: 2.25rem 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
}
:host .lede {
  font-size: 1.0625rem;
}
:host a {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}
:host code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.875em;
  padding: 0.1em 0.35em;
  border-radius: 4px;
  background: var(--surface-2);
}
:host ul {
  padding-left: 1.25rem;
}
:host li + li {
  margin-top: 0.25rem;
}
:host dl div {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--grid);
}
:host dd {
  margin: 0;
}
:host .formula {
  padding: 1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  color: var(--ink);
  font-weight: 600;
  text-align: center;
}
:host .back {
  display: inline-block;
  margin-top: 2rem;
  font-weight: 600;
}
:host .why {
  margin: 1.5rem 0 2rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border);
  border-left: 4px solid var(--series-1);
  border-radius: 12px;
  background: var(--surface);
}
:host .why h2 {
  margin-top: 0;
}
:host .why p:last-child {
  margin-bottom: 0;
}
:host .why p + p {
  margin-top: 0.75rem;
}
`,s=class extends r{static tagName=`methodology-page`;constructor(){super(a,o)}init(){this.querySelector(`[data-csv-link]`).href=n,this.querySelector(`[data-project-link]`).href=e,t().then(e=>{let t=this.querySelector(`[data-tracked-link]`);if(t.href=e.issuesUrl||e.repositoryUrl,t.textContent=e.repository,this.querySelectorAll(`[data-queue-only]`).forEach(t=>t.hidden=!e.queue),e.queue){let t=(e,t)=>{this.querySelector(e).textContent=t};t(`[data-queue-repository]`,e.queue.repository),t(`[data-queue-open]`,e.queue.openDir),t(`[data-queue-resolved]`,e.queue.resolvedDir)}for(let[t,n]of Object.entries(e.limits)){let e=this.querySelector(`[data-limit="${t}"]`);e&&(e.textContent=String(n))}let n=this.querySelector(`[data-why]`);if(n.hidden=!e.why,e.why){this.querySelector(`[data-why-text]`).textContent=e.why.text;let t=this.querySelector(`[data-why-source]`);t.hidden=!e.why.url,this.querySelector(`[data-why-link]`).href=e.why.url}}),i().then(e=>{if(!e)return;let{description:t,runTimesUtc:n}=e.schedule;this.querySelector(`[data-schedule]`).textContent=n.length?`${t} (${n.join(`, `)} UTC)`:t})}};customElements.get(s.tagName)||customElements.define(s.tagName,s);export{s as MethodologyPageComponent};