const React = require(`react`);

const BlueprintText = {
    title: `The Blueprint project Data Reuse statement`,
    content: (
        <div>
            <p>
                This document refers to the reuse of data generated by the EC funded FP7 High Impact Project,
                Blueprint.
            </p>
            <p>
                Blueprint regularly released analysis results via its ftp site and makes the raw sequence data
                available through the sequence archives at the EMBL-EBI. Much Blueprint data is generated from samples
                whose data must be released through a managed access process. For these data sets external users must
                apply for permission to access the data from the European Genome-phenome Archive (EGA) through the
                Blueprint Data Access Committee.
            </p>
            <p>
                The Blueprint consortium expects this data to be valuable to other researchers and in keeping with Fort
                Lauderdale principles data users may use the data for many studies, but are expected to allow the data
                producers to make the first presentations and to publish the first paper with global analyses of the
                data.
            </p>

            <h4>Global analyses of Project data</h4>
            <p>
                Blueprint plans to publish global analyses of the sequencing data, epigenetic marks, expression levels
                and variation both in the context of normal hematopoietic cells and of those neoplastic and
                non-neoplastic diseases studied within th econsortium. Talks, posters, and papers on all such analyses
                are to be published first by the Blueprint project, by approved presenters on behalf of the Project,
                with the Project as author. When the first major Project paper on these analyses is published, then
                researchers inside and outside the Project are free to present and publish using the Project data for
                these and other analyses.
            </p>

            <h4>Large-scale analyses of Project data</h4>
            <p>
                Groups within the Project may make presentations and publish papers on more extensive analyses of
                topics to be included in the main analysis presentations and papers, coincident with the main project
                analysis presentations and papers. The major points would be included in the main Project presentations
                and papers, but these additional presentations and papers allow more focused discussion of methods and
                results. The author list would include the Consortium.
            </p>

            <h4>Methods development using Project data</h4>
            <p>
                Researchers who have used small amounts of Project data (&lt;= one chromosome) may present methods
                development posters, talks, and papers that include these data prior to the first major Project paper,
                without needing Project approval or authorship, although the Project should be acknowledged. Methods
                presentations or papers on global analyses or analyses using large amounts of Project data, on topics
                that the Consortium plans to examine, would be similar to large-scale analyses of Project data:
                researchers within the Project may make presentations or submit papers at the same time as the main
                Project presentations and papers, and others could do so after the Project publishes the first major
                analysis paper.
            </p>

            <h4>Disease studies using Project data</h4>
            <p>
                Researchers may present and publish on use of Project data in specific chromosome regions (that are not
                of general interest) or as summaries (such as number of differentially expressed genes in cell types
                assayed by Blueprint) for studies on diseases not studied by BLUEPRINT without Project approval, prior
                to the first major Project paper being published. The Project should not be listed as an author.
            </p>

            <h4>Authors who use data from the project must acknowledge Blueprint using the following wording</h4>
            <p>
                This study makes use of data generated by the Blueprint Consortium. A full list of the investigators
                who contributed to the generation of the data is available from
                <a href="http://www.blueprint-epigenome.eu">www.blueprint-epigenome.eu</a>. Funding for the
                project was provided by the European Union's Seventh Framework Programme (FP7/2007-2013) under grant
                agreement no 282510 – BLUEPRINT.
            </p>
        </div>
    )
};

const ZebrafishText = {
    title: `Data Reuse statement`,
    content: (
        <div>
            <p>
                This is a pre-publication release in accordance with <a href="http://www.sanger.ac.uk/datasharing/">
                the Fort Lauderdale Agreement </a>. Feel free to search and download data on your genes of interest.
            </p>
            <p>
                Equally, you can use the dataset to show developmental expression profiles for specific genes in your
                publications.
            </p>
            <p>
                However, we ask that you refrain from publishing larger scale or genome-wide analyses of this dataset
                for 12 months from the time of deposition in Expression Atlas or until we have published our
                transcriptional time-course paper, whichever comes first.
            </p>
            <p>
                For citations in publications before the paper is out please use this link to the Expression Atlas
                site (<a href="https://www.ebi.ac.uk/gxa/experiments/E-ERAD-475">
                http://www.ebi.ac.uk/gxa/experiments/E-ERAD-475</a>) and acknowledge us: “We would like to thank the
                Busch-Nentwich lab for providing RNA-seq data.”
            </p>
        </div>
    )
};

module.exports = {"fortLauderdale": BlueprintText, "zebrafish": ZebrafishText};
