import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { Button, Loading, Avatar, Tooltip, Text, Link } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const inputDataLengthLimit = 500;
  const requirementLengthLimit = 500;
  const sampleInputData = `student,score
Aさん,70
Bさん,40
Cさん,80
Dさん,30
Eさん,60
Fさん,70`;
  const sampleRequirement = `全studentのscoreの平均値、最大値、最小値を出力するSQLを作成してください。
SQLはBigQueryで動作可能な状態で作成してください。`;
  const sampleOutput = ``;
  const [inputData, setInputData] = useState(sampleInputData);
  const [requirement, setRequirement] = useState(sampleRequirement);
  const [output, setOutput] = useState(sampleOutput);
  const [isLoading, setIsLoading] = useState(false);
  const generateSQL = async () => {
    const obj = { inputData, requirement };
    const method = "POST";
    const body = JSON.stringify(obj);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    setOutput("");
    setIsLoading(true);
    const res = await fetch("/api/hello", { method, headers, body }).then((res) => res.json());
    setIsLoading(false);
    setOutput(res.gptMessage);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.appName}>
            <Text
              h1
              size={25}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              SQL Generator
            </Text>
          </div>
          <div className={styles.myName}>
            <a href="https://www.atukan-blog.com/contact" target="_blank" rel="noopener noreferrer">
              Created by
              <div>
                <Tooltip content={"📨"} initialVisible={true}>
                  <Avatar
                    className={styles.profileIcon}
                    size="xl"
                    src="/profile.jpeg"
                    color="gradient"
                    bordered
                    zoomed
                    pointer={true}
                    borderWeight={"normal"}
                  />
                </Tooltip>
                <div className={styles.profileName}>Naoki</div>
              </div>
            </a>
          </div>
        </div>
        <table className={styles.center}>
          <tbody>
            <tr>
              <th className={styles.left}>
                <label className={styles.label}>TABLE_DATA ※csv形式推奨</label>
              </th>
              <th className={styles.right}>
                <label className={styles.label}>TABLE_DATAに対するSQLの要件</label>
              </th>
            </tr>
            <tr>
              <td className={styles.left}>
                <textarea
                  className={styles.textarea}
                  rows={15}
                  value={inputData}
                  onChange={(event) => setInputData(event.target.value)}
                  wrap="off"
                ></textarea>
                <p className={styles.note}>
                  現在{inputData.length}文字　※{inputDataLengthLimit}文字以内
                </p>
              </td>
              <td className={styles.right}>
                <textarea
                  className={styles.textarea}
                  rows={15}
                  value={requirement}
                  onChange={(event) => setRequirement(event.target.value)}
                ></textarea>
                <p className={styles.note}>
                  現在{requirement.length}文字　※{requirementLengthLimit}文字以内
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <Button
            className={styles.mainButton}
            size="lg"
            color="gradient"
            onPress={generateSQL}
            disabled={
              inputData.length > inputDataLengthLimit || requirement.length > requirementLengthLimit
            }
          >
            {inputData.length > inputDataLengthLimit ||
            requirement.length > requirementLengthLimit ? (
              "文字数を超えています😔 文字数を減らしてください🙏"
            ) : isLoading ? (
              <Loading type="points" color="currentColor" size="sm" />
            ) : (
              "SQLを生成する 🥳"
            )}
          </Button>
        </div>

        <div className={styles.output}>
          <textarea
            className={styles.textarea}
            placeholder={"こちらにSQLが生成されます"}
            rows={15}
            value={output}
            onChange={(event) => setOutput(event.target.value)}
            wrap="off"
          ></textarea>
        </div>

        {/* <div className={styles.grid}>
          <a href="" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a href="" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a href="" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a href="" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.
            </p>
          </a>
        </div> */}
      </main>
      <div className={styles.footer}>
        <Link
          className={styles.privacyPolicy}
          href="https://www.atukan-blog.com/privacyPolicy"
          isExternal
          block
          target="_blank"
          rel="noopener noreferrer"
        >
          プライバシーポリシー
        </Link>
      </div>
    </>
  );
}
