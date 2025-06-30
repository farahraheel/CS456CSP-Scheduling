import fsPromises from "fs/promises";
import path from "path";

async function logger(msg: string): Promise<void> {
    try {
        const now = new Date();
        let line = `${now.toLocaleString()} \t ${msg}\n`;
        line += "----------------------------\n";

        const logPath = path.join(__dirname, "..", "logger.txt");  // ملف اللوق بمستوى واحد فوق src مثلاً
        await fsPromises.appendFile(logPath, line);
    } catch (error) {
        console.error("Logger error:", error);
    }
}

export default logger;
