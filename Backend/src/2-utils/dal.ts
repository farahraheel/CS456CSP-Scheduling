import mysql from "mysql";
import appConfig from "./app-config";

// إنشاء pool للاتصالات مع تحديد الحد الأقصى لعدد الاتصالات المفتوحة
const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database,
    connectionLimit: 10 // تحديد حد الاتصالات لمنع استهلاك الموارد بشكل كبير
});

/**
 * تنفيذ استعلام SQL مع قيم اختيارية
 * @param sql نص الاستعلام
 * @param values مصفوفة القيم للاستعلام (اختياري)
 * @returns وعد يحل بنتيجة الاستعلام أو يرفض بالخطأ
 */
function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error("SQL Error:", err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {
    execute
};
