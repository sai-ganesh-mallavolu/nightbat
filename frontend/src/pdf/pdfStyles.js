import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({

    page: {

        padding: 40,

        fontSize: 11,

        fontFamily: "Helvetica",

        backgroundColor: "#FFFFFF",

        color: "#111827",

    },

    header: {

        backgroundColor: "#06B6D4",

        padding: 20,

        borderRadius: 8,

        marginBottom: 25,

    },

    title: {

        fontSize: 26,

        color: "#FFFFFF",

        fontWeight: "bold",

        textAlign: "center",

    },

    subtitle: {

        fontSize: 12,

        color: "#FFFFFF",

        textAlign: "center",

        marginTop: 5,

    },

    infoCard: {

        borderWidth: 1,

        borderColor: "#E5E7EB",

        borderRadius: 8,

        padding: 12,

        marginBottom: 20,

    },

    infoTitle: {

        color: "#06B6D4",

        fontSize: 12,

        fontWeight: "bold",

        marginBottom: 4,

    },

    section: {

        marginBottom: 18,

    },

    sectionTitle: {

        fontSize: 18,

        color: "#06B6D4",

        fontWeight: "bold",

        marginBottom: 10,

    },

    body: {

        fontSize: 11,

        lineHeight: 1.6,

    },

    bullet: {

        marginBottom: 6,

        marginLeft: 10,

    },

    footer: {

        position: "absolute",

        bottom: 20,

        left: 40,

        right: 40,

        fontSize: 10,

        color: "#6B7280",

        flexDirection: "row",

        justifyContent: "space-between",

    },

});

export default styles;