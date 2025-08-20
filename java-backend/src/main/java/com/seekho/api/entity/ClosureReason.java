package com.seekho.api.entity;


import jakarta.persistence.*;


@Entity
@Table(name = "closure_reason")
public class ClosureReason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "closure_reason_id")
    private int closureReasonId;

    @Column(name = "closure_reason_desc")
    private String closureReasonDesc;

    @Column(name = "enquirer_name")
    private String enquirerName;

    public ClosureReason(){}
    public ClosureReason(String enquirerName, String closureReasonDesc){
        this.enquirerName = enquirerName;
        this.closureReasonDesc = closureReasonDesc;
    }

    public void setEnquirerName(String enquirerName){
        this.enquirerName = enquirerName;
    }

    public String getEnquirerName(){
        return this.enquirerName;
    }

    public int getClosureReasonId() {
        return closureReasonId;
    }

    public void setClosureReasonId(int closureReasonId) {
        this.closureReasonId = closureReasonId;
    }

    public String getClosureReasonDesc() {
        return closureReasonDesc;
    }

    public void setClosureReasonDesc(String closureReasonDesc) {
        this.closureReasonDesc = closureReasonDesc;
    }
}
